function set (env, obj = {}, key, def) {
  const { set } = this.bajo.helper._
  return set(obj, key, def)
}

export default set
