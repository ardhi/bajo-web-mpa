function getAttr (theme, { name, context, args }) {
  const { isSet } = this.scope.bajo.helper
  const { omit, kebabCase, isEmpty, isArray, isString } = this.scope.bajoWebMpa.util

  let attr = omit(args.pop() ?? {}, ['__keywords'])
  const params = [...args].filter(a => isString(a)).map(a => kebabCase(a))
  let attributes = []
  const deleted = []
  for (const k in attr) {
    if (!isSet(attr[k])) {
      deleted.push(k)
      continue
    }
    if (['class', 'style', 'classBase'].includes(k) || !isSet(attr[k])) continue
    const key = kebabCase(k)
    attributes.push(attr[k] === true ? `${key}` : `${key}="${attr[k]}"`)
  }
  attributes = attributes.join(' ')
  attr = omit(attr, deleted)
  if (!isEmpty(attr.class)) attr.class = ' ' + (isArray(attr.class) ? attr.class.join(' ') : attr.class)
  return { attr, attributes, params }
}

export default getAttr
