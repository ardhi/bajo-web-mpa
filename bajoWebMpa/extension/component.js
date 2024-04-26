// import format from './component/format.js'
import getAttr from './component/get-attr.js'

const excludes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

class Cmp {
  constructor (options) {
    this.scope = options.scope
    this.tags = ['cmp']
  }

  parse (parser, nodes, lexer) {
    const token = parser.nextToken()
    const args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(token.value)

    const body = parser.parseUntilBlocks('endcmp')
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtension(this, 'run', args, [body])
  }

  run (context, ...args) {
    // const callback = args.pop()
    try {
      const { kebabCase, get, find } = this.scope.bajo.helper._
      const { fs } = this.scope.bajo.helper
      const { resolveComponentPath } = this.scope.bajoWebMpa.helper
      // const { getConfig } = this.scope.bajo.helper
      // const cfg = getConfig('bajoWebMpa')
      const body = args.pop()
      let name = args.shift()
      if (!excludes.includes(name)) name = kebabCase(name)
      const file = resolveComponentPath(name, context.ctx._meta.theme, true)
      const { form, error, _meta, schema } = context.ctx ?? {}
      const { theme } = _meta
      let handler = get(this.scope, `${theme.plugin}.helper.getAttrHandler.exec`)
      let themeName = theme.name
      if (!handler) {
        const parent = find(this.scope.bajoWebMpa.themes, { name: theme.framework })
        themeName = parent.name
        handler = get(this.scope, `${parent.plugin}.helper.getAttrHandler.exec`)
      }
      if (handler) handler = handler(themeName)
      const { attr, attributes, params } = getAttr.call(this, { name, context, args }, handler)
      const locals = { cmp: name, params, attr, attributes, content: body(), form, error, _meta, schema }
      const fragment = fs.readFileSync(file, 'utf8').replaceAll('\r', '') // TODO: replace new line inside the brackets only
      return context.env.renderString(fragment, locals)
    } catch (err) {
      console.log(err)
      return ''
    }
    /*
    const ret = context.env.render(`${item}:${theme.name}`, locals)
    */
    // return cfg.formatTagResult ? format.call(this, ret) : ret
  }
}

function cmp () {
  return new Cmp({ scope: this })
}

export default cmp
