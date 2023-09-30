import preParse from './pre-parse.js'

const mapping = {
  pointerEvents: 'pe',
  width: 'w',
  height: 'h',
  maxWidth: 'mw',
  maxHeight: 'mh',
  viewportWidth: 'vw',
  viewportHeight: 'vh',
  minViewportWidth: 'min-vw',
  minViewportHeight: 'min-vh',
  zIndex: 'z',
  hStack: 'hstack',
  vStack: 'vstack',
  verticalRule: 'vr',
  visuallyHidden: 'visually-hidden',
  displayHeading: 'display',
  stretchedLink: 'stretched-link',
  heading: {
    key: 'h',
    sep: ''
  }
}

function parseDirect ({ name, attr, key, context }) {
  const { rkey, sep, items } = preParse.call(this, { attr, key, context }, mapping)
  const { kebabCase, isArray } = this.scope.bajoWebMpa.util
  if (name === 'column' && key === 'width') {
    attr.width = items[0]
    return true
  }
  if (items === true || (isArray(items) && items.length === 0)) attr.class.push(rkey)
  else {
    for (const i of items) {
      attr.class.push(`${rkey}${sep}${kebabCase(i)}`)
    }
  }
  return true
}

export default parseDirect
