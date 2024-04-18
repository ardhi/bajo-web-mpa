import * as cheerio from 'cheerio'

class Script {
  constructor (options) {
    this.scope = options.scope
    this.tags = ['script']
  }

  parse (parser, nodes, lexer) {
    const token = parser.nextToken()
    const args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(token.value)

    const body = parser.parseUntilBlocks('endscript')
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtension(this, 'run', args, [body])
  }

  run (context, ...args) {
    const { isEmpty } = this.scope.bajo.helper._
    const body = args.pop()
    const $ = cheerio.load(body())
    let content = $('script').text()
    if (isEmpty(content)) content = body()
    context.ctx._meta.script = context.ctx._meta.script ?? []
    context.ctx._meta.script.push(...content.split('\n'))
  }
}

function script () {
  return new Script({ scope: this })
}

export default script
