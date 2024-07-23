function stringToObject (text = '', delimiter = ';', kvDelimiter = ':') {
  const { camelCase } = this.app.bajo.lib._
  const result = {}
  const array = this.stringToArray(text, delimiter)
  array.forEach(item => {
    const [key, val] = this.stringToArray(item, kvDelimiter)
    result[camelCase(key)] = val
  })
  return result
}

export default stringToObject
