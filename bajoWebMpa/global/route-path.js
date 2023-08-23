function routePath (env, name, query = {}) {
  return this.bajoWeb.helper.routePath(name, { query })
}

export default routePath
