import preParse from './pre-parse.js'
import getSizing from './get-sizing.js'

const mapping = {
  margin: 'm',
  padding: 'p'
}

const sides = {
  top: 't',
  bottom: 'b',
  start: 's',
  end: 'e'
}

function parseDirectSpacing ({ attr, key, context }) {
  const { rkey, items } = preParse.call(this, { attr, key, context }, mapping)
  const { kebabCase } = this.scope.bajoWebMpa.util
  for (const i of items) {
    const parts = kebabCase(i).split('-')
    if (parts.length >= 2) {
      const side = sides[parts[0]]
      parts[0] = side ?? parts[0]
      const sizing = getSizing.call(this, parts[1], context)
      parts[1] = sizing ?? parts[1]
    } else parts.unshift('')
    attr.class.push(`${rkey}${parts.join('-')}`)
  }
  return true
}

export default parseDirectSpacing
