function parseDirect ({ attr, key, context }) {
  const { isString, kebabCase } = this.scope.bajoWebMpa.util
  const items = isString(attr[key]) ? attr[key].split(',') : attr[key]
  const rkey = kebabCase(key)
  attr.class = attr.class ?? []
  delete attr[key]
  if (items === true) attr.class.push(rkey)
  else {
    for (const i of items) {
      attr.class.push(`${rkey}-${kebabCase(i)}`)
    }
  }
  return true
}

export default parseDirect
