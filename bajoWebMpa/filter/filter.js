function filter (env, obj, condition) {
  const { filter } = this.bajo.helper._
  return filter(obj, condition)
}

export default filter
