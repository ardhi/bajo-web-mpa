function getAttr (theme, { name, context, args }, { parseForClass, selectAttr, preProcess, postProcess } = {}) {
  const { isSet } = this.scope.bajo.helper
  const { omit, kebabCase, isEmpty, isArray, isString, trim } = this.scope.bajoWebMpa.util

  let attr = omit(args.pop() ?? {}, ['__keywords'])
  attr.class = attr.class ?? []
  if (isString(attr.class)) {
    const separator = attr.class.includes(',') ? ',' : ' '
    attr.class = attr.class.split(separator).map(c => trim(c))
  }
  const params = [...args].filter(a => isString(a)).map(a => kebabCase(a))
  let attributes = []
  const deleted = []
  if (preProcess) preProcess.call(this, { name, attr, context, args })
  for (const k in attr) {
    if (!isSet(attr[k])) {
      deleted.push(k)
      continue
    }
    if (parseForClass) {
      const item = parseForClass.call(this, { name, key: k, attr, context, args })
      if (item) {
        deleted.push(k)
        continue
      }
    }
    if (['class', 'style', 'classBase'].includes(k) || !isSet(attr[k])) continue
    if (selectAttr) {
      const ret = selectAttr.call(this, { name, key: k, attr, context, args })
      if (ret) continue
    }
    const key = kebabCase(k)
    attributes.push(attr[k] === true ? `${key}` : `${key}="${attr[k]}"`)
  }
  attributes = attributes.join(' ')
  attr = omit(attr, deleted)
  if (!isEmpty(attr.class)) attr.class = ' ' + (isArray(attr.class) ? attr.class.join(' ') : attr.class)
  if (postProcess) postProcess.call(this, { name, attr, context, args })
  return { attr, attributes, params }
}

export default getAttr
