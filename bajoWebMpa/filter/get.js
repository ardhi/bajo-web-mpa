function get (env, obj = {}, key, def) {
  const { get } = this.bajoWebMpa.util
  return get(obj, key, def)
}

export default get
