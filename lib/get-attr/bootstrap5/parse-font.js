import preParse from './pre-parse.js'

const mapping = {
  font: 'f'
}

const sides = {
  size: 's',
  weight: 'w',
  style: 'st'
}

function parseDirectSpacing ({ attr, key, context }) {
  const { rkey, sep, items } = preParse.call(this, { attr, key, context }, mapping)
  const { kebabCase, isEmpty } = this.scope.bajoWebMpa.util
  for (const i of items) {
    if (isEmpty(i)) continue
    const parts = kebabCase(i).split('-')
    if (parts.length >= 2) {
      const side = sides[parts[0]]
      parts[0] = side ?? parts[0]
      attr.class.push(`${rkey}${parts.join('-')}`)
    } else attr.class.push(`${key}${sep}${parts[0]}`)
  }
  return true
}

export default parseDirectSpacing
