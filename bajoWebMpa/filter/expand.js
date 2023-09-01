function expand (env, obj) {
  const params = []
  for (const k in obj) {
    params.push(`${k}="${obj[k]}"`)
  }
  return params.join(' ')
}

export default expand
