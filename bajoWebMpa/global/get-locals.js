function getLocals (env, key) {
  const { get } = this.bajo.helper._
  if (!key) return env.ctx
  return get(env, `ctx.${key}`)
}

export default getLocals
