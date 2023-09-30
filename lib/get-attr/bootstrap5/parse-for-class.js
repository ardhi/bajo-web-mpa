import parseDirect from './parse-direct.js'
import parseIndirect from './parse-indirect.js'
import parseColumns from './parse-columns.js'
import parseDirectSizing from './parse-direct-sizing.js'
import parseDirectSpacing from './parse-direct-spacing.js'
import parseFont from './parse-font.js'
import parsePosition from './parse-position.js'

const indirects = ['border', 'focusRing', 'iconLink', 'ratio']
const directs = ['bg', 'pointerEvents', 'userSelect', 'link', 'objectFit', 'opacity', 'rounded',
  'overflow', 'width', 'height', 'maxWidth', 'maxHeight', 'viewportWidth', 'viewportHeight',
  'minViewportWidth', 'minViewportHeight', 'align', 'zIndex', 'vStack', 'hStack', 'gap',
  'verticalRule', 'visuallyHidden', 'clearfix', 'displayHeading', 'heading', 'stretchedLink']
const directSizings = ['text', 'display', 'flex', 'float', 'justifyContent', 'alignItems', 'alignSelf',
  'order', 'alignContent', 'shadow', 'lineHeight', 'sticky', 'fixed', 'expand']

function parseForClass ({ name, key, attr, context }) {
  if (directs.includes(key)) return parseDirect.call(this, { name, key, attr, context })
  if (indirects.includes(key)) return parseIndirect.call(this, { name, key, attr, context })
  if (directSizings.includes(key)) return parseDirectSizing.call(this, { name, key, attr, context })
  if (['margin', 'padding'].includes(key)) return parseDirectSpacing.call(this, { name, key, attr, context })
  if (key === 'font') return parseFont.call(this, { name, key, attr, context })
  if (key === 'columns') return parseColumns.call(this, { name, key, attr, context })
  if (key === 'position') return parsePosition.call(this, { name, key, attr, context })
}

export default parseForClass
