function json (env, value, ...args) {
  const { sprintf } = this.bajo.helper
  return sprintf(value, ...args)
}

export default json
