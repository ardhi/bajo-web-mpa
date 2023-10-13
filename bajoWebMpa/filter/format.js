function format (env, value, type = 'string', options) {
  if (!this.bajoI18N) return value
  const { format } = this.bajoI18N.helper
  const { lang } = env.ctx._meta
  return format(value, type, lang, options)
}

export default format
