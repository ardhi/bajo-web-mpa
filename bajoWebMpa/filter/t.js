function t (env, msg, ...args) {
  const { isPlainObject, merge } = this.bajoWebMpa.util
  const { i18n, ns } = env.ctx._meta
  if (!i18n) return msg
  if (isPlainObject(args[0])) return i18n.t(msg, merge({}, args[0] ?? {}, { ns }))
  return i18n.t(msg, { ns, postProcess: 'sprintf', sprintf: args })
}

export default t
