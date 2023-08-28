import parseForClass from './parse-for-class.js'
import getSizing from './get-sizing.js'

const omitAll = ['sizing', 'plaintext', 'options', 'variant', 'outline', 'error',
  'success', 'active', 'check', 'radio', 'tag', 'fluid']

const omitAttr = {
  value: ['textarea'],
  type: ['button'],
  label: ['label']
}

const pickAttr = {
  caption: ['table'],
  width: ['img']
}

function getAttr ({ name, context, args }) {
  const { isSet } = this.scope.bajo.helper
  const { omit, kebabCase, isEmpty, isArray, isString } = this.scope.bajoWebMpa.util

  let attr = omit(args.pop() ?? {}, ['__keywords'])
  const params = [...args].filter(a => isString(a)).map(a => kebabCase(a))
  let attributes = []
  const deleted = []
  if (name === 'form-input' && attr.inputPlaintext) attr.inputReadonly = true
  if (name === 'select' && isArray(attr.options)) {
    for (const i in attr.options) {
      if (isString(attr.options[i])) {
        let [value, text, selected] = attr.options[i].split(':')
        if (isEmpty(text)) text = value
        attr.options[i] = { value, text, selected }
      }
    }
  }
  for (const k in attr) {
    if (!isSet(attr[k])) {
      deleted.push(k)
      continue
    }
    const item = parseForClass.call(this, { name, key: k, attr, context })
    if (item) {
      deleted.push(k)
      continue
    }
    if (['class', 'style', 'classBase'].includes(k) || !isSet(attr[k])) continue
    if (omitAll.includes(k) || (omitAttr[k] ?? []).includes(name)) continue
    if (pickAttr[k] && !pickAttr[k].includes(name)) continue
    const key = kebabCase(k)
    attributes.push(attr[k] === true ? `${key}` : `${key}="${attr[k]}"`)
  }
  attributes = attributes.join(' ')
  attr = omit(attr, deleted)
  if (!isEmpty(attr.class)) attr.class = ' ' + (isArray(attr.class) ? attr.class.join(' ') : attr.class)
  if (attr.sizing) {
    attr.sizing = getSizing.call(this, attr.sizing, context)
    if (!attr.sizing) delete attr.sizing
  }
  return { attr, attributes, params }
}

export default getAttr
