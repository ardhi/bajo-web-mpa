function get (env, obj = {}, key, def) {
  const { get } = this.bajo.helper._
  return get(obj, key, def)
}

export default get
