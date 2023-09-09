import getSizing from './get-sizing.js'

function parseColumns ({ attr, key, context }) {
  const { isString } = this.scope.bajoWebMpa.util
  const list = []
  for (let c of attr[key]) {
    let item = ''
    if (isString(c)) {
      const [sizing, width] = c.split(':')
      c = { sizing, width }
    }
    if (c.sizing) {
      const sizing = getSizing.call(this, c.sizing, context)
      if (sizing) item += '-' + sizing
    }
    if (c.width) item += '-' + c.width
    list.push(item)
  }
  attr[key] = list
  return true
}

export default parseColumns
