async function buildLocals (name, params = {}, req, reply) {
  const { importPkg, runHook, getConfig } = this.bajo.helper
  const { find, merge, concat, pick, get } = await importPkg('lodash-es')
  const cfg = getConfig('bajoWebMpa')
  const themes = this.bajoWebMpa.themes
  const theme = find(themes, { name: req.theme }) ?? {}
  const { site, user, lang, i18n, dark } = req
  const ns = concat([name.split(':')[0]], cfg.i18n.defaultNs)
  const _meta = { theme, site, user, lang, i18n, tpl: name, darkMode: dark, ns }
  merge(_meta, pick(req, ['url', 'params', 'query']))
  _meta.route = get(req, 'routeOptions.url')
  _meta.flash = reply.flash()
  const merged = merge({}, params, { _meta })
  await runHook('bajoWebMpa:buildLocals', merged, req)
  return merged
}

export default buildLocals
