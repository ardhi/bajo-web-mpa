import fs from 'fs'

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
    return new nodes.CallExtensionAsync(this, 'run', args, [body])
  }

  run (context, ...args) {
    const callback = args.pop()
    const body = args.pop()
    const attr = args.pop()
    delete attr.__keywords
    const name = args.shift()
    const params = []
    for (const k in attr) {
      params.push(`${k}="${attr[k]}"`)
    }
    const { theme, themes } = context.ctx
    const { getConfig } = this.scope.bajo.helper
    const { renderString } = context.env
    let dir = getConfig(theme.plugin, { full: true }).dir
    let item = `${dir}/bajoWebMpa/tag/${theme.name}/${name}.njk`
    if (!fs.existsSync(item)) { // is it in theme?
      const t = themes.find(i => i.name === theme.framework)
      if (t) {
        dir = getConfig(t.plugin, { full: true }).dir
        item = `${dir}/bajoWebMpa/tag/${t.name}/${name}.njk`
      }
    }
    if (!fs.existsSync(item)) { // is it in framework?
      dir = getConfig('bajoWebMpa', { full: true }).dir
      item = `${dir}/bajoWebMpa/tag/${name}.njk`
    }
    if (!fs.existsSync(item)) {
      item = `${dir}/bajoWebMpa/tag/_custom.njk`
    }
    const fragment = fs.readFileSync(item, 'utf8')
    const locals = { tag: name, attr: params.join(' '), content: body(), theme, themes }
    const ret = renderString(fragment, locals)
    callback(null, ret)
  }
}

async function tag () {
  return new Tag({ scope: this })
}

export default tag
