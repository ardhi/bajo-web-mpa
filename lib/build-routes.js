export async function build ({ ctx, files, pathPrefix, dir, plugin, cfg, alias, parent }) {
  const { importModule, log, defaultsDeep, getPluginName } = this.bajo.helper
  const { routeDir, mergeRouteHooks } = this.bajoWeb.helper
  const { isFunction, isPlainObject, pick, isString } = this.bajo.helper._
  const lang = cfg.i18n.detectors.includes('path') ? '/:lang' : ''
  const isRouteDisabled = await importModule('bajoWeb:/lib/is-route-disabled.js')
  for (const f of files) {
    const url = f.slice(0, f.length - 3).replace(`${dir}/${pathPrefix}`, '').replaceAll('@', ':')
    let mod = await importModule(f)
    if (isFunction(mod)) mod = [{ handler: mod }]
    else if (isPlainObject(mod)) mod = [mod]
    for (let m of mod) {
      m.url = m.url ?? url
      if (alias) m.url = `/${alias}${m.url}`
      m.method = m.method ?? 'GET'
      if (await isRouteDisabled.call(this, m.url, m.method, cfg.disabled)) {
        log.warn('Route %s (%s) is disabled', m.url, m.method)
        continue
      }
      await mergeRouteHooks(m)
      m.config = m.config ?? {}
      m.config.path = url
      m.config.webApp = getPluginName()
      m.config.plugin = parent ?? plugin
      m.config.title = m.title ?? m.config.name
      if (parent) m.config.subRouteOf = plugin
      delete m.title
      m = defaultsDeep(pick(cfg, ['exposeHeadRoute', 'bodyLimit']), m)
      log.trace('Serving MPA: %s (%s)', `${lang}${routeDir(plugin, 'bajoWebMpa')}${m.url}`.replaceAll('///', '/').replaceAll('//', '/'), isString(m.method) ? m.method : m.method.join(','))
      await ctx.route(m)
    }
  }
}

async function buildRoutes (ctx) {
  const { fastGlob, getConfig, eachPlugins, runHook } = this.bajo.helper
  const cfg = getConfig('bajoWebMpa')
  const pathPrefix = 'bajoWebMpa/route'
  await eachPlugins(async function ({ dir, alias, plugin }) {
    let appPrefix = alias
    if (plugin === 'bajoWebMpa' || (plugin === 'app' && cfg.mountAppAsRoot)) appPrefix = ''
    const pattern = `${dir}/${pathPrefix}/**/*.js`
    const files = await fastGlob(pattern)
    if (files.length === 0) return undefined
    await ctx.register(async (childCtx) => {
      await build.call(this, { ctx: childCtx, files, pathPrefix, dir, plugin, cfg })
      await runHook(`bajoWebMpa.${alias}:afterBuildRoutes`, childCtx)
    }, { prefix: appPrefix })
  })
}

export default buildRoutes
