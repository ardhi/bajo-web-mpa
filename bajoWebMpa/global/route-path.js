function routePath (env, name, opts = {}) {
  opts.params = env.ctx._meta.reqParams
  return this.bajoWeb.helper.routePath(name, opts)
}

export default routePath
