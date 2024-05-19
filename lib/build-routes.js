export async function build ({ files, pathPrefix, dir, plugin, cfg, parent }) {
  const { importModule, defaultsDeep, getPluginName } = this.bajo.helper
  const { mergeRouteHooks } = this.bajoWeb.helper
  const { isFunction, isPlainObject, pick } = this.bajo.helper._
  const mods = []
  for (const f of files) {
    const url = f.slice(0, f.length - 3).replace(`${dir}/${pathPrefix}`, '').replaceAll('@', ':')
    let mod = await importModule(f)
    if (isFunction(mod)) mod = [{ handler: mod }]
    else if (isPlainObject(mod)) mod = [mod]
    for (let m of mod) {
      m.url = m.url ?? url
      m.method = m.method ?? 'GET'
      await mergeRouteHooks(m)
      m.config = m.config ?? {}
      m.config.pathSrc = m.url
      m.config.webApp = getPluginName()
      m.config.plugin = parent ?? plugin
      m.config.title = m.title ?? m.config.name
      if (parent) m.config.subRouteOf = plugin
      delete m.title
      m = defaultsDeep(pick(cfg, ['exposeHeadRoute', 'bodyLimit']), m)
      mods.push(m)
    }
  }
  return mods
}

async function buildRoutes (ctx, prefix) {
  const { fastGlob, getConfig, eachPlugins, runHook, log, importModule } = this.bajo.helper
  const cfg = getConfig('bajoWebMpa')
  const pathPrefix = 'bajoWebMpa/route'
  const isRouteDisabled = await importModule('bajoWeb:/lib/is-route-disabled.js')
  const reroutedPath = await importModule('bajoWeb:/lib/rerouted-path.js')
  await eachPlugins(async function ({ dir, alias, plugin }) {
    let appPrefix = alias
    if (plugin === 'bajoWebMpa' || (plugin === 'app' && cfg.mountAppAsRoot)) appPrefix = ''
    const pattern = `${dir}/${pathPrefix}/**/*.js`
    const files = await fastGlob(pattern)
    if (files.length === 0) return undefined
    await ctx.register(async (appCtx) => {
      const mods = await build.call(this, { appCtx, files, pathPrefix, dir, plugin, cfg })
      for (const mod of mods) {
        const fullPath = `/${appPrefix}${mod.url}`
        if (await isRouteDisabled.call(this, fullPath, mod.method, cfg.disabled)) {
          log.warn('Route %s (%s) is disabled', `${prefix}${fullPath}`, mod.method)
          continue
        }
        const rpath = await reroutedPath.call(this, fullPath, cfg.rerouted)
        if (rpath) {
          log.warn('Rerouted %s -> %s', `${prefix}${fullPath}`, `${prefix}${rpath}`)
          mod.url = rpath
          mod.pathReroutedTo = rpath
          await ctx.route(mod)
        } else await appCtx.route(mod)
      }
      await runHook(`bajoWebMpa.${alias}:afterBuildRoutes`, appCtx)
    }, { prefix: appPrefix })
  })
}

export default buildRoutes
