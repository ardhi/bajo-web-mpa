async function buildRoutes (ctx) {
  const { getConfig, importPkg, eachPlugins, importModule, log, defaultsDeep } = this.bajo.helper
  const fastGlob = await importPkg('fast-glob')
  const { isFunction, isPlainObject, camelCase, pick, isString } = await importPkg('lodash-es')
  const cfg = getConfig('bajoWebMpa')
  const pathPrefix = 'bajoWebMpa/route'
  const prefix = cfg.prefix
  await eachPlugins(async function ({ dir, alias, plugin }) {
    let appPrefix = alias
    if (plugin === 'app' && cfg.mountAppAsRoot) appPrefix = ''
    const pattern = `${dir}/${pathPrefix}/**/*.js`
    const files = await fastGlob(pattern)
    if (files.length === 0) return undefined
    const me = this
    await ctx.register(async (childCtx) => {
      for (const f of files) {
        const url = f.slice(0, f.length - 3).replace(`${dir}/${pathPrefix}`, '').replaceAll('@', ':')
        let mod = await importModule(f)
        if (isFunction(mod)) mod = [{ handler: mod }]
        else if (isPlainObject(mod)) mod = [mod]
        for (let m of mod) {
          m.url = m.url ?? url
          m.method = m.method ?? 'GET'
          const oldHandler = m.handler
          m.handler = async function (req, reply) {
            return await oldHandler.call(me, this, req, reply)
          }
          m.config = m.config ?? {}
          m.config.name = `${plugin}:${camelCase(m.method + ' ' + m.url)}`
          m = defaultsDeep(pick(cfg, ['exposeHeadRoute', 'bodyLimit']), m)
          log.trace('Serving MPA: %s (%s)', `/${prefix}/${appPrefix}${m.url}`.replaceAll('///', '/').replaceAll('//', '/'), isString(m.method) ? m.method : m.method.join(','))
          await childCtx.route(m)
        }
      }
    }, { prefix: appPrefix })
  })
}

export default buildRoutes
