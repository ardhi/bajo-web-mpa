async function decorate (ctx) {
  const { getConfig, importPkg } = this.bajo.helper
  const { render } = this.bajoWebMpa.helper
  const { merge, find, get } = await importPkg('lodash-es')
  const cfg = getConfig('bajoWebMpa')
  const themes = this.bajoWebMpa.themes
  let ctheme = find(themes, { name: cfg.theme })
  if (!ctheme) ctheme = get(themes, '0.name', {})
  ctx.decorateRequest('theme', ctheme.name ?? '')
  ctx.decorateRequest('dark', cfg.darkMode.preset)
  ctx.decorateRequest('i18n', null)
  ctx.decorateReply('view', async function (name, params = {}) {
    this.header('Content-Type', 'text/html; charset=' + cfg.charset)
    const theme = find(themes, { name: this.request.theme }) ?? {}
    const { site, user, lang, i18n, dark } = this.request
    const ext = { theme, themes, site, user, lang, i18n, tpl: name, dark }
    ext.reqParams = this.request.params
    ext.reqQuery = this.request.query
    const locals = merge({}, params, ext)
    const html = await render(`${name}:${this.request.theme}`, locals)
    this.header('Content-Language', lang)
    return html
  })
}

export default decorate
