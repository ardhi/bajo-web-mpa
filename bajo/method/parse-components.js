import * as cheerio from 'cheerio'

const tmpPrefix = 'xcx:'
const namespace = 'c:'

async function replaceTag (el, cmp, reply) {
  const { forOwn, isEmpty, isArray, isPlainObject, isString } = this.app.bajo.lib._

  let tag = el.name.slice(2)
  let prefix = tmpPrefix
  let params = {
    html: cmp.$(el).html(),
    attr: el.attribs ?? {}
  }
  if (isString(params.attr.class)) params.attr.class = this.stringToArray(params.attr.class)
  if (isString(params.attr.style)) params.attr.style = this.stringToObject(params.attr.style)
  let attrs = []
  const result = await cmp.buildTag(tag, params, reply)
  if (result) {
    if (this.config.component.insertCtag) attrs.push(`ctag="${namespace}${tag}"`)
    params = result
    prefix = ''
    tag = params.tag ?? this.config.component.defaultTag
  }
  forOwn(params.attr, (v, k) => {
    if (isEmpty(v)) return undefined
    if (isArray(v)) v = this.arrayToString(v)
    if (isPlainObject(v)) v = this.objectToString(v)
    attrs.push(`${k}="${v}"`)
  })
  attrs = attrs.join(' ')
  if (!isEmpty(attrs)) attrs = ' ' + attrs
  if (params.noTag) cmp.$(el).replaceWith(params.html)
  else if (params.selfClose) cmp.$(el).replaceWith(`<${prefix}${tag}${attrs} />`)
  else cmp.$(el).replaceWith(`<${prefix}${tag}${attrs}>` + params.html + `</${prefix}${tag}>`)
}

async function walk (el, cmp, reply) {
  const me = this
  const children = cmp.$(el).children()
  if (children.length > 0) {
    for (const child of children) {
      await walk.call(me, child, cmp, reply)
      if (child.name.startsWith(namespace)) await replaceTag.call(me, child, cmp, reply)
    }
  }
}

async function parseComponents (text, ve, reply) {
  if (!this.config.component || !ve.createComponent) return text

  const $ = cheerio.load(text, {
    xml: {
      xmlMode: true,
      decodeEntities: true
    }
  })
  const cmp = ve.createComponent($)
  await walk.call(this, $('html'), cmp, reply)
  $('html').attr('lang', reply.request.lang)
  text = $.root().html()
  text = text.replaceAll(tmpPrefix, namespace)
  return text
}

export default parseComponents
