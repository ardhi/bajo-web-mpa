class Tag {
  constructor (options) {
    this.scope = options.scope
    this.tags = ['tag']
  }

  format (text) {
    // const all = text.match(/<([^<>]*)>/g)
    const { filter } = this.scope.bajoWebMpa.util
    const all = filter(text.split('\n').map(t => {
      return t.replace(/\s\s+/g, ' ').replace('\r', '')
    }), a => !['', ' ', ' class=""', ' style=""'].includes(a))
    return all.join('\n')
      .replaceAll('class=" ', 'class="')
      .replaceAll('style=""', '')
      .replaceAll('\n>', '>')
      .replace(/  +/g, ' ')
      .replaceAll(' >', '>')
      .replaceAll('\n <', '\t')
      .replaceAll('\n ', ' ')
      .replaceAll('\t', '\n <')
      .replaceAll('</div>\n ', '</div>\n')
      .replaceAll('\n>', '>')
  }

  getAttr (name, context, args) {
    const { isSet } = this.scope.bajo.helper
    const { omit, kebabCase, get, keys } = this.scope.bajoWebMpa.util
    const omitAttr = {
      value: ['textarea'],
      type: ['button'],
      label: ['label'],
      sizing: true, // true => omitted on all tags
      plaintext: true,
      options: true,
      variant: true,
      outline: true,
      error: true,
      success: true,
      active: true,
      check: true,
      radio: true,
      tag: true
    }
    const pickAttr = {
      caption: ['table']
    }

    let attr = omit(args.pop() ?? {}, ['__keywords'])
    const params = [...args].filter(a => typeof a === 'string').map(a => kebabCase(a))
    let attributes = []
    const deleted = []
    if (name === 'form-input' && attr.inputPlaintext) attr.inputReadonly = true
    for (const k in attr) {
      if (!isSet(attr[k])) {
        deleted.push(k)
        continue
      }
      if (['class', 'style', 'classBase'].includes(k) || !isSet(attr[k])) continue
      if (omitAttr[k] === true || (omitAttr[k] ?? []).includes(name)) continue
      if (pickAttr[k] && !pickAttr[k].includes(name)) continue
      const key = kebabCase(k)
      attributes.push(attr[k] === true ? `${key}` : `${key}="${attr[k]}"`)
    }
    attributes = attributes.join(' ')
    attr = omit(attr, deleted)
    if (attr.class) attr.class = ' ' + attr.class
    if (attr.sizing) {
      const sizing = get(context, 'ctx.theme.mapping.sizing', {})
      if (keys(sizing).includes(attr.sizing)) attr.sizing = sizing[attr.sizing]
      else delete attr.sizing
    }
    return { attr, attributes, params }
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
    const { kebabCase, fs } = this.scope.bajoWebMpa.util
    const { resolveTagPath } = this.scope.bajoWebMpa.helper
    const { getConfig } = this.scope.bajo.helper
    const cfg = getConfig('bajoWebMpa')
    const body = args.pop()
    const name = kebabCase(args.shift())
    const { attr, attributes, params } = this.getAttr(name, context, args)
    const file = resolveTagPath(name, context.ctx.theme, true)
    const { theme, themes } = context.ctx
    const locals = { tag: name, params, attr, attributes, content: body(), theme, themes }
    const fragment = fs.readFileSync(file, 'utf8').replaceAll('\r', '') // TODO: replace new line inside the brackets only
    const ret = context.env.renderString(fragment, locals)
    /*
    const ret = context.env.render(`${item}:${theme.name}`, locals)
    */
    return cfg.formatTagResult ? this.format(ret) : ret
  }
}

async function tag () {
  return new Tag({ scope: this })
}

export default tag
