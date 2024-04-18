function t (env, msg, ...args) {
  const { sprintf } = this.bajo.helper
  const { isPlainObject, merge } = this.bajo.helper._
  const { i18n, ns } = env.ctx._meta
  if (!i18n) return sprintf(msg, ...args)
  if (isPlainObject(args[0])) return i18n.t(msg, merge({}, args[0] ?? {}, { ns }))
  return i18n.t(msg, { ns, postProcess: 'sprintf', sprintf: args })
}

export default t
