async function home (ctx) {
  const { getConfig } = this.bajo.helper
  const { routePath } = this.bajoWeb.helper
  const cfg = getConfig('bajoWebMpa')
  ctx.get('/', async function (req, reply) {
    if (cfg.home.route === true) return await reply.view('bajoWebMpa:/home')
    // if (cfg.home.action === 'forward') TODO: forward
    reply.redirect(routePath(cfg.home.route, { params: { lang: req.lang } }))
  })
}

export default home
