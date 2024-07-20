import path from 'path'

async function decorate (ctx) {
  const { importPkg } = this.app.bajo
  const { isEmpty } = this.app.bajo.lib._
  const mime = await importPkg('bajoWeb:mime')
  const cfg = this.config
  const me = this
  ctx.decorateRequest('i18n', null)
  ctx.decorateReply('view', async function (name, params = {}) {
    const ext = path.extname(name)
    const mimeType = isEmpty(ext) ? ('text/html; charset=' + cfg.charset) : mime.getType(ext)
    this.header('Content-Type', mimeType)
    this.header('Content-Language', this.request.lang)
    return await me.render(name, params, this)
  })
}

export default decorate
