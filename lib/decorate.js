import path from 'path'

async function decorate (ctx) {
  const { getConfig, importPkg } = this.bajo.helper
  const { render, buildLocals } = this.bajoWebMpa.helper
  const { find, get, isEmpty } = this.bajo.helper._
  const mime = await importPkg('bajoWeb:mime')
  const cfg = getConfig('bajoWebMpa')
  const themes = this.bajoWebMpa.themes
  let ctheme = find(themes, { name: cfg.theme })
  if (!ctheme) ctheme = get(themes, '0.name', {})
  ctx.decorateRequest('theme', ctheme.name ?? '')
  ctx.decorateRequest('dark', cfg.darkMode.preset)
  ctx.decorateRequest('i18n', null)
  ctx.decorateRequest('menu', null)
  ctx.decorateReply('view', async function (name, params = {}) {
    const ext = path.extname(name)
    const mimeType = isEmpty(ext) ? ('text/html; charset=' + cfg.charset) : mime.getType(ext)
    this.header('Content-Type', mimeType)
    const locals = await buildLocals(name, params, this.request, this)
    const html = await render(`${name}:${this.request.theme}`, locals)
    this.header('Content-Language', this.request.lang)
    return html
  })
}

export default decorate
