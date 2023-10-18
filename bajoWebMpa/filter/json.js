function json (env, value, method, options) {
  return JSON[method](value, options)
}

export default json
