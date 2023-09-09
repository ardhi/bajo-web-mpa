import preParse from './pre-parse.js'

function parseIndirect ({ attr, key, context }) {
  const { rkey, sep, items } = preParse.call(this, { attr, key, context })
  const { kebabCase, isArray } = this.scope.bajoWebMpa.util
  // TODO: bug in ratio: 16x9 => 16-x-9, caused by kebabCase
  if (items === true || (isArray(items) && items.length === 0)) attr.class.push(rkey)
  else {
    attr.class.push(rkey)
    for (const i of items) {
      attr.class.push(`${rkey}${sep}${kebabCase(i)}`)
    }
  }
  return true
}

export default parseIndirect
