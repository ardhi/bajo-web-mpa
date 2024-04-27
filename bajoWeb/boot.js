import decorate from '../lib/decorate.js'
import viewEngine from '../lib/engine/view.js'
import buildRoutes from '../lib/build-routes.js'
import subApp from '../lib/sub-app.js'
import notFound from '../lib/not-found.js'
import error from '../lib/error.js'
import home from '../lib/home.js'
import setupSession from '../lib/session/setup.js'
import markdown from '../lib/markdown/instance.js'

const boot = {
  level: 10,
  handler: async function () {
    const { getConfig, importPkg, importModule, runHook } = this.bajo.helper
    const bodyParser = await importPkg('bajoWeb:@fastify/formbody')
    const cfg = getConfig('bajoWebMpa')
    let prefix = cfg.prefix === '' ? '' : ('/' + cfg.prefix)
    if (cfg.i18n.detectors.includes('path')) prefix = `/:lang${prefix}`
    const routeHook = await importModule('bajoWeb:/lib/route-hook.js')
    const handleMultipart = await importModule('bajoWeb:/lib/handle-multipart-body.js')
    const handleCors = await importModule('bajoWeb:/lib/handle-cors.js')
    const handleHelmet = await importModule('bajoWeb:/lib/handle-helmet.js')
    const handleCompress = await importModule('bajoWeb:/lib/handle-compress.js')
    const handleRateLimit = await importModule('bajoWeb:/lib/handle-rate-limit.js')
    await markdown.call(this)
    await this.bajoWeb.instance.register(async (ctx) => {
      this.bajoWebMpa.instance = ctx
      await runHook('bajoWebMpa:afterCreateContext', ctx)
      await setupSession.call(this, ctx)
      await ctx.register(bodyParser)
      await handleRateLimit.call(this, ctx, cfg.rateLimit)
      await handleCors.call(this, ctx, cfg.cors)
      await handleHelmet.call(this, ctx, cfg.helmet)
      await handleCompress.call(this, ctx, cfg.compress)
      await handleMultipart.call(this, ctx, cfg.multipart)
      await routeHook.call(this, 'bajoWebMpa')
      await error.call(this, ctx)
      await viewEngine.call(this, ctx)
      await decorate.call(this, ctx)
      await subApp.call(this, ctx)
      await runHook('bajoWebMpa:beforeCreateRoutes', ctx)
      await buildRoutes.call(this, ctx)
      await runHook('bajoWebMpa:afterCreateRoutes', ctx)
      await home.call(this, ctx)
      await notFound.call(this, ctx)
    }, { prefix })
  }
}

export default boot
