import getSizing from './get-sizing.js'
import preParse from './pre-parse.js'

const mapping = {
  display: 'd',
  lineHeight: 'lh',
  expand: 'navbar-expand'
}

function parseDirectSizing ({ attr, key, context }) {
  const { rkey, sep, items } = preParse.call(this, { attr, key, context }, mapping)
  const { kebabCase, isArray } = this.scope.bajoWebMpa.util
  if (items === true || (isArray(items) && items.length === 0)) attr.class.push(rkey)
  else {
    for (const i of items) {
      const parts = kebabCase(i).split('-')
      if (parts.length === 1 || parts.length >= 2) {
        const sizing = getSizing.call(this, parts[0], context)
        parts[0] = sizing ?? parts[0]
      }
      attr.class.push(`${rkey}${sep}${parts.join('-')}`)
    }
  }
  return true
}

export default parseDirectSizing
