import getSizing from './get-sizing.js'

const omitAll = ['sizing', 'plaintext', 'options', 'variant', 'outline', 'error', 'dark',
  'success', 'active', 'check', 'radio', 'tag', 'fluid', 'numbered', 'useNav', 'navbar',
  'noLink', 'onParent', 'masonry', 'shown', 'stretchedLink']

const omitAttr = {
  value: ['textarea'],
  type: ['button'],
  label: ['label'],
  name: ['icon'],
  href: ['navbar-brand', 'button']
}

const pickAttr = {
  caption: ['table'],
  width: ['img']
}

export { default as parseForClass } from './parse-for-class.js'

export function preProcess ({ name, attr, context, args }) {
  const { isEmpty, isArray, isString } = this.scope.bajoWebMpa.util
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
}

export function selectAttr ({ name, attr, key, context, args }) {
  let skip = false
  if (omitAll.includes(key) || (omitAttr[key] ?? []).includes(name)) skip = true
  if (pickAttr[key] && !pickAttr[key].includes(name)) skip = true
  return skip
}

export function postProcess ({ name, attr, context, args }) {
  if (attr.sizing) {
    attr.sizing = getSizing.call(this, attr.sizing, context)
    if (!attr.sizing) delete attr.sizing
  }
}
