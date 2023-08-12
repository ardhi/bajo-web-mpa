import decorate from '../lib/decorate.js'
import viewEngine from '../lib/engine/view.js'
import buildRoutes from '../lib/build-routes.js'

async function boot () {
  const { getConfig, importPkg } = this.bajo.helper
  const bodyParser = await importPkg('bajo-web:@fastify/formbody')
  const cfg = getConfig('bajoWebMpa')
  const prefix = cfg.prefix

  await this.bajoWeb.instance.register(async (ctx) => {
    await ctx.register(bodyParser)
    await viewEngine.call(this, ctx)
    await decorate.call(this, ctx)
    await buildRoutes.call(this, ctx)
  }, { prefix })
}

export default boot
