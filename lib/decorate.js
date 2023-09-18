async function decorate (ctx) {
  const { getConfig, importPkg } = this.bajo.helper
  const { render, buildLocals } = this.bajoWebMpa.helper
  const { find, get } = await importPkg('lodash-es')
  const cfg = getConfig('bajoWebMpa')
  const themes = this.bajoWebMpa.themes
  let ctheme = find(themes, { name: cfg.theme })
  if (!ctheme) ctheme = get(themes, '0.name', {})
  ctx.decorateRequest('theme', ctheme.name ?? '')
  ctx.decorateRequest('dark', cfg.darkMode.preset)
  ctx.decorateRequest('i18n', null)
  ctx.decorateReply('view', async function (name, params = {}) {
    this.header('Content-Type', 'text/html; charset=' + cfg.charset)
    const locals = await buildLocals(name, params, this.request)
    const html = await render(`${name}:${this.request.theme}`, locals)
    this.header('Content-Language', this.request.lang)
    return html
  })
}

export default decorate
