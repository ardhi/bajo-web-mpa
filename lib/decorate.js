import path from 'path'

async function buildLocals (tpl, params = {}, reply) {
  const { runHook } = this.app.bajo
  const { find, merge, pick, get, isEmpty } = this.app.bajo.lib._
  const theme = find(this.themes, { name: reply.request.theme }) ?? {}
  const { site, user, lang, i18n } = reply.request
  // const ns = concat([name.split(':')[0]], cfg.i18n.defaultNs)
  const routeOpts = get(reply.request, 'routeOptions.config', {})
  const _meta = { theme, site, user, lang, i18n, tpl, routeOpts }
  merge(_meta, pick(reply.request, ['url', 'params', 'query']))
  _meta.url = _meta.url.split('?')[0].split('#')[0]
  _meta.qsKey = this.app.bajoWeb.config.qsKey
  _meta.route = get(reply.request, 'routeOptions.url')
  if (reply.request.session) _meta.flash = reply.flash()
  const merged = merge({}, params, { _meta })
  await runHook(`${this.name}:afterBuildLocals`, merged, reply.request)
  if (!isEmpty(routeOpts.ns)) await runHook(`${this.name}.${routeOpts.ns}:afterBuildLocals`, merged, reply.request)
  return merged
}

async function decorate (ctx) {
  const { importPkg } = this.app.bajo
  const { isEmpty } = this.app.bajo.lib._
  const mime = await importPkg('bajoWeb:mime')
  const cfg = this.config
  const me = this
  ctx.decorateRequest('i18n', null)
  // tpl format: <ns>:<path>[:theme]
  ctx.decorateReply('view', async function (tpl, params = {}) {
    const ext = path.extname(tpl)
    const mimeType = isEmpty(ext) ? ('text/html; charset=' + cfg.charset) : mime.getType(ext)
    this.header('Content-Type', mimeType)
    this.header('Content-Language', this.request.lang)
    const locals = await buildLocals.call(me, tpl, params, this)
    return await me.render(tpl, locals, this)
  })
}

export default decorate
