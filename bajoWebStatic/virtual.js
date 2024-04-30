async function virtual () {
  const { getConfig } = this.bajo.helper
  const cfg = getConfig('bajoWebMpa')
  const virts = []
  if (cfg.virtuals.jquery) virts.push({ prefix: 'jquery', root: 'jquery:/dist' })
  if (cfg.virtuals.prismjs) virts.push({ root: 'prismjs:', prefix: 'prismjs' })
  if (cfg.virtuals.bs5) virts.push({ prefix: 'bs5', root: 'bootstrap5:/dist' })
  if (cfg.virtuals.bs4) virts.push({ prefix: 'bs4', root: 'bootstrap4:/dist' })
  if (cfg.virtuals.icons) virts.push({ prefix: 'icons', root: 'bootstrap-icons:' })
  if (cfg.virtuals.masonry) virts.push({ prefix: 'masonry', root: 'masonry-layout:/dist' })
  if (cfg.virtuals.highlightjs) virts.push({ prefix: 'highlight.js', root: '@highlightjs/cdn-assets:' })
  if (cfg.virtuals.imagesloaded) virts.push({ prefix: 'imagesloaded', root: 'imagesloaded:' })
  if (cfg.virtuals.bootbox) virts.push({ prefix: 'bootbox', root: 'bootbox:/dist' })
  if (cfg.virtuals.tempusDominus) virts.push({ prefix: 'tempus-dominus', root: '@eonasdan/tempus-dominus:/dist' })
  if (cfg.virtuals.echarts) virts.push({ prefix: 'echarts', root: 'echarts:/dist' })
  return virts
}

export default virtual
