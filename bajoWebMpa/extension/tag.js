import format from '../../lib/tag/format.js'
import defGetAttr from '../../lib/tag/get-attr.js'

class Tag {
  constructor (options) {
    this.scope = options.scope
    this.tags = ['tag']
  }

  parse (parser, nodes, lexer) {
    const token = parser.nextToken()
    const args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(token.value)

    const body = parser.parseUntilBlocks('endtag')
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtension(this, 'run', args, [body])
  }

  run (context, ...args) {
    // const callback = args.pop()
    const { kebabCase, fs, get } = this.scope.bajoWebMpa.util
    const { resolveTagPath } = this.scope.bajoWebMpa.helper
    const { getConfig } = this.scope.bajo.helper
    const cfg = getConfig('bajoWebMpa')
    const body = args.pop()
    const name = kebabCase(args.shift())
    const file = resolveTagPath(name, context.ctx.theme, true)
    const { theme, themes } = context.ctx
    let getAttr = get(this.scope, `${theme.plugin}.helper.getAttr.exec`)
    if (!getAttr) getAttr = defGetAttr
    const { attr, attributes, params } = getAttr.call(this, theme.name, { name, context, args })
    const locals = { tag: name, params, attr, attributes, content: body(), theme, themes }
    const fragment = fs.readFileSync(file, 'utf8').replaceAll('\r', '') // TODO: replace new line inside the brackets only
    const ret = context.env.renderString(fragment, locals)
    /*
    const ret = context.env.render(`${item}:${theme.name}`, locals)
    */
    return cfg.formatTagResult ? format.call(this, ret) : ret
  }
}

async function tag () {
  return new Tag({ scope: this })
}

export default tag
