function set (env, obj = {}, key, def) {
  const { set } = this.bajoWebMpa.util
  return set(obj, key, def)
}

export default set
