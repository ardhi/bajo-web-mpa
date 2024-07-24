import * as cheerio from 'cheerio'

const tmpPrefix = 'xcx:'
const namespace = 'c:'

function replaceTag (el, cmp) {
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
  const result = cmp.buildTag(tag, params)
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

  if (params.selfClose) cmp.$(el).replaceWith(`<${prefix}${tag}${attrs} />`)
  else cmp.$(el).replaceWith(`<${prefix}${tag}${attrs}>` + params.html + `</${prefix}${tag}>`)
}

function walk (el, cmp) {
  const me = this
  const children = cmp.$(el).children()
  if (children.length > 0) {
    cmp.$(children).each(function () {
      walk.call(me, this, cmp)
      if (this.name.startsWith(namespace)) replaceTag.call(me, this, cmp)
    })
  }
}

async function parseComponents (text, ve) {
  if (!this.config.component || !ve.createComponent) return text

  const $ = cheerio.load(text)
  const cmp = ve.createComponent($)
  walk.call(this, $('*'), cmp)
  text = $.html()
  text = text.replaceAll(tmpPrefix, namespace)
  return text
}

export default parseComponents
