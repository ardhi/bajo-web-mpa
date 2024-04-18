function pick (env, obj, params = []) {
  const { pick } = this.bajo.helper._
  return pick(obj, params)
}

export default pick
