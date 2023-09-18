function t (env, msg, ...args) {
  const { isArray, isPlainObject, merge } = this.bajoWebMpa.util
  let { i18n, ns } = env.ctx._meta
  if (!i18n) return msg
  if (!isArray(ns)) ns = [ns]
  if (!ns.includes('bajoDb')) ns.push('bajoDb')
  if (!ns.includes('bajoWebMpa')) ns.push('bajoWebMpa')
  if (isPlainObject(args[0])) return i18n.t(msg, merge({}, args[0] ?? {}, { ns }))
  return i18n.t(msg, { ns, postProcess: 'sprintf', sprintf: args })
}

export default t
