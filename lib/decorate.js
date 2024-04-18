async function decorate (ctx) {
  const { getConfig } = this.bajo.helper
  const { render, buildLocals } = this.bajoWebMpa.helper
  const { find, get } = this.bajo.helper._
  const cfg = getConfig('bajoWebMpa')
  const themes = this.bajoWebMpa.themes
  let ctheme = find(themes, { name: cfg.theme })
  if (!ctheme) ctheme = get(themes, '0.name', {})
  ctx.decorateRequest('theme', ctheme.name ?? '')
  ctx.decorateRequest('dark', cfg.darkMode.preset)
  ctx.decorateRequest('i18n', null)
  ctx.decorateRequest('menu', null)
  ctx.decorateReply('view', async function (name, params = {}) {
    this.header('Content-Type', 'text/html; charset=' + cfg.charset)
    const locals = await buildLocals(name, params, this.request, this)
    const html = await render(`${name}:${this.request.theme}`, locals)
    this.header('Content-Language', this.request.lang)
    return html
  })
}

export default decorate
