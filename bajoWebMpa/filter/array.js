function array (env, arr = [], method, value) {
  return arr[method](value)
}

export default array
