function preParse ({ attr, key, context } = {}, mapping = {}) {
  const { isString, kebabCase, isArray, trim, isNumber } = this.scope.bajo.helper._
  let items = isArray(attr[key]) ? attr[key] : []
  if (isString(attr[key])) items = attr[key].split(',').map(i => trim(i))
  if (isNumber(attr[key])) items = [attr[key] + '']
  let rkey = kebabCase(key)
  let sep = '-'
  if (mapping[key]) {
    rkey = isString(mapping[key]) ? mapping[key] : mapping[key].key
    sep = isString(mapping[key]) ? '-' : (mapping[key].sep ?? '-')
    // rkey = kebabCase(key)
  }
  // attr.class = attr.class ?? []
  delete attr[key]
  return { items, rkey, sep }
}

export default preParse
