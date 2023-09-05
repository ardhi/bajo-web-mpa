function routePath (env, name, opts = {}) {
  opts.params = env.ctx.reqParams
  return this.bajoWeb.helper.routePath(name, opts)
}

export default routePath
