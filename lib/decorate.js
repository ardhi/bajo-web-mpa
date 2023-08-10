async function decorate (ctx) {
  const { getConfig } = this.bajo.helper
  const { render } = this.bajoWebMpa.helper
  const cfg = getConfig('bajoWebMpa')
  ctx.decorateRequest('theme', 'bootstrap')
  ctx.decorateReply('view', async function (name, locals) {
    this.header('Content-Type', 'text/html; charset=' + cfg.charset)
    const theme = this.request.theme
    const html = await render(`${name}:${theme}`, locals, { req: this.request })
    this.send(html)
  })
}

export default decorate
