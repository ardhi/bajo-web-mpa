import parseDirect from './parse-direct.js'
import parseIndirect from './parse-indirect.js'
import parseColumns from './parse-columns.js'

function parseForClass ({ name, key, attr, context }) {
  if (['text', 'bg'].includes(key)) return parseDirect.call(this, { name, key, attr })
  if (['border'].includes(key)) return parseIndirect.call(this, { name, key, attr })
  if (key === 'columns') return parseColumns.call(this, { name, key, attr, context })
}

export default parseForClass
