async function decorate (ctx) {
  const { getConfig, importPkg } = this.bajo.helper
  const { render } = this.bajoWebMpa.helper
  const { merge, find, get } = await importPkg('lodash-es')
  const cfg = getConfig('bajoWebMpa')
  const themes = this.bajoWebMpa.themes
  let ctheme = find(themes, { name: cfg.theme })
  if (!ctheme) ctheme = get(themes, '0.name', {})
  ctx.decorateRequest('theme', ctheme.name ?? '')
  ctx.decorateRequest('i18n', null)
  ctx.decorateReply('view', async function (name, params = {}) {
    this.header('Content-Type', 'text/html; charset=' + cfg.charset)
    const theme = find(themes, { name: this.request.theme }) ?? {}
    const { site, user, lang, i18n } = this.request
    const locals = merge({}, params, { theme, themes, site, user, lang, i18n, tpl: name })
    const html = await render(`${name}:${this.request.theme}`, locals, { req: this.request })
    this.header('Content-Language', lang)
    this.send(html)
  })
}

export default decorate
