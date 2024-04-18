function is (env, value, method) {
  const { isSet, pascalCase } = this.bajo.helper
  method = `is${pascalCase(method)}`
  if (method === 'isSet') return isSet(value)
  return this.bajo.helper._[method](value)
}

export default is
