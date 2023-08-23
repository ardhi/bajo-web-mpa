import decorate from '../lib/decorate.js'
import viewEngine from '../lib/engine/view.js'
import buildRoutes from '../lib/build-routes.js'
import notFound from '../lib/not-found.js'
import error from '../lib/error.js'

const boot = {
  level: 10,
  handler: async function () {
    const { getConfig, importPkg, importModule, runHook } = this.bajo.helper
    const bodyParser = await importPkg('bajo-web:@fastify/formbody')
    const cfg = getConfig('bajoWebMpa')
    const prefix = cfg.prefix
    const cfgWeb = getConfig('bajoWeb', { full: true })
    const routeHook = await importModule(`${cfgWeb.dir}/lib/route-hook.js`)
    await this.bajoWeb.instance.register(async (ctx) => {
      this.bajoWebMpa.instance = ctx
      await runHook('bajoWebMpa:afterCreateContext', ctx)
      await routeHook.call(this, 'bajoWebMpa')
      await ctx.register(bodyParser)
      await error.call(this, ctx)
      await viewEngine.call(this, ctx)
      await decorate.call(this, ctx)
      await buildRoutes.call(this, ctx)
      await notFound.call(this, ctx)
    }, { prefix })
  }
}

export default boot
