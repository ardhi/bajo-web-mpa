function getLocals (env, key) {
  const { get } = this.bajoWebMpa.util
  if (!key) return env.ctx
  return get(env, `ctx.${key}`)
}

export default getLocals
