async function decorate (ctx) {
  const { getConfig, importPkg } = this.bajo.helper
  const { render } = this.bajoWebMpa.helper
  const { merge, find } = await importPkg('lodash-es')
  const cfg = getConfig('bajoWebMpa')
  const themes = this.bajoWebMpa.themes
  ctx.decorateRequest('theme', 'bootstrap')
  ctx.decorateReply('view', async function (name, params = {}) {
    this.header('Content-Type', 'text/html; charset=' + cfg.charset)
    const theme = find(themes, { name: this.request.theme })
    const locals = merge({}, params, { theme, themes })
    const html = await render(`${name}:${this.request.theme}`, locals, { req: this.request })
    this.send(html)
  })
}

export default decorate
