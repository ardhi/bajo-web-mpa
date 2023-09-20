async function buildLocals (name, params = {}, req, reply) {
  const { importPkg, runHook } = this.bajo.helper
  const { find, merge } = await importPkg('lodash-es')
  const themes = this.bajoWebMpa.themes
  const theme = find(themes, { name: req.theme }) ?? {}
  const { site, user, lang, i18n, dark } = req
  const _meta = { theme, site, user, lang, i18n, tpl: name, darkMode: dark, ns: name.split(':')[0] }
  _meta.reqParams = req.params
  _meta.reqQuery = req.query
  _meta.flash = reply.flash()
  const merged = merge({}, params, { _meta })
  await runHook('bajoWebMpa:buildLocals', merged, req)
  return merged
}

export default buildLocals
