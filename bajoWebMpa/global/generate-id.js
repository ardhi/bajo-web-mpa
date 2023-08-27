function generateId (env, opts = {}) {
  opts.length = opts.length ?? 10
  return this.bajo.helper.generateId(opts)
}

export default generateId
