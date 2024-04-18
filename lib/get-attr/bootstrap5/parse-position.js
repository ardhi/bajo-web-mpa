import preParse from './pre-parse.js'

function parseDirectSpacing ({ attr, key, context }) {
  const { rkey, items } = preParse.call(this, { attr, key, context })
  const { kebabCase, filter } = this.scope.bajo.helper._
  for (const i of items) {
    const [type, prop1, pos1, prop2, pos2, ...args] = kebabCase(i).split('-')
    const parts = filter([`${rkey}-${type}`, `${prop1}-${pos1}`, `${prop2}-${pos2}`, args.join('-')], a => {
      return !['undefined-undefined', '', '-'].includes(a)
    })
    attr.class.push(parts.join(' '))
  }
  return true
}

export default parseDirectSpacing
