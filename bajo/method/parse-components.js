import * as cheerio from 'cheerio'

const tmpPrefix = 'xcx:'
const namespace = 'c:'

function replaceTag (el, $, ve) {
  const { camelCase, get, forOwn, isEmpty } = this.app.bajo.lib._

  let tag = el.name.slice(2)
  let prefix = tmpPrefix
  const params = {
    html: $(el).html(),
    attr: el.attribs ?? {}
  }
  params.attr.class = this.stringToArray(params.attr.class)
  params.attr.style = this.stringToObject(params.attr.style)
  const cmpMethod = get(this, `app.${ve.ns}.component.${camelCase(tag)}`)
  let attrs = []
  if (cmpMethod) {
    if (this.config.componentName) attrs.push(`mpac="${tag}"`)
    cmpMethod(params, el, $, ve)
    prefix = ''
    tag = params.tag ?? tag
  }
  params.attr.class = this.arrayToString(params.attr.class)
  params.attr.style = this.objectToString(params.attr.style)
  forOwn(params.attr, (v, k) => {
    if (isEmpty(v)) return undefined
    attrs.push(`${k}="${v}"`)
  })
  attrs = attrs.join(' ')
  if (!isEmpty(attrs)) attrs = ' ' + attrs

  if (params.selfClose) $(el).replaceWith(`<${prefix}${tag}${attrs} />`)
  else $(el).replaceWith(`<${prefix}${tag}${attrs}>` + params.html + `</${prefix}${tag}>`)
}

function walk (el, $, ve) {
  const me = this
  const children = $(el).children()
  if (children.length > 0) {
    $(children).each(function () {
      walk.call(me, this, $, ve)
      if (this.name.startsWith(namespace)) replaceTag.call(me, this, $, ve)
    })
  }
}

async function parseComponents (text, ve) {
  const $ = cheerio.load(text)
  walk.call(this, $('*'), $, ve)
  text = $.html()
  text = text.replaceAll(tmpPrefix, namespace)
  return text
}

export default parseComponents
