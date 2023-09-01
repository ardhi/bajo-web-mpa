function t (env, msg, ...args) {
  const { isPlainObject } = this.bajoWebMpa.util
  const { i18n, tpl } = env.ctx
  if (!i18n) return msg
  const opts = isPlainObject(args[args.length - 1]) ? args.pop() : {}
  const ns = opts.ns ?? tpl.split(':')[0]
  if (isPlainObject(args[0])) return i18n.t(msg, args[0])
  return i18n.t(msg, { ns, postProcess: 'sprintf', sprintf: args })
}

export default t
