function tExists (env, key, opts = {}) {
  const { isString } = this.bajoWebMpa.util
  const { i18n, tpl } = env.ctx._meta
  if (!i18n) return false
  if (isString(opts)) opts = { ns: opts }
  const ns = opts.ns ?? tpl.split(':')[0]
  return i18n.exists(key, { ns })
}

export default tExists
