function map (env, obj = [], handler) {
  const { map } = this.bajo.helper._
  return map(obj, handler)
}

export default map
