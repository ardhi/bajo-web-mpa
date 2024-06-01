import icon from './icon.js'
import mapping from './mapping.js'

async function themes () {
  const { getConfig, eachPlugins, runHook } = this.bajo.helper
  const cfg = getConfig('bajoWebMpa')
  const { virtualDir, assetDir } = this.bajoWebStatic.helper

  const commonScript = []
  if (cfg.virtuals.bootbox) commonScript.push(`${virtualDir('bajoWebMpa')}/bootbox/bootbox.min.js`)
  if (cfg.virtuals.masonry) commonScript.push(`${virtualDir('bajoWebMpa')}/masonry/masonry.pkgd.min.js`)
  if (cfg.virtuals.imagesloaded) commonScript.push(`${virtualDir('bajoWebMpa')}/imagesloaded/imagesloaded.pkgd.min.js`)
  if (cfg.virtuals.tempusDominus) commonScript.push(`${virtualDir('bajoWebMpa')}/tempus-dominus/js/tempus-dominus.min.js`)
  if (cfg.virtuals.echarts) commonScript.push(`${virtualDir('bajoWebMpa')}/echarts/echarts.min.js`)
  await runHook('bajoWebMpa:afterCommonScriptCollect', commonScript)
  await eachPlugins(async function ({ plugin, file, dir }) {
    const path = assetDir(plugin) + file.replace(`${dir}/asset`, '')
    commonScript.push(path)
  }, { glob: 'asset/js/autoload/**/*.js', ns: 'bajoWebStatic' })
  await runHook('bajoWebMpa:afterAllScriptCollect', commonScript)

  const commonCss = []
  if (cfg.virtuals.icons) commonCss.push(`${virtualDir('bajoWebMpa')}/icons/font/bootstrap-icons.min.css`)

  const bs5Script = []
  if (cfg.virtuals.jquery) bs5Script.push(`${virtualDir('bajoWebMpa')}/jquery/jquery.min.js`)
  if (cfg.virtuals.bs5) bs5Script.push(`${virtualDir('bajoWebMpa')}/bs5/js/bootstrap.bundle.min.js`)
  bs5Script.push(...commonScript)

  const bs5Css = []
  if (cfg.virtuals.bs5) bs5Css.push(`${virtualDir('bajoWebMpa')}/bs5/css/bootstrap.min.css`)
  bs5Css.push(...commonCss)

  const bs4Script = []
  if (cfg.virtuals.jquery) bs4Script.push(`${virtualDir('bajoWebMpa')}/jquery/jquery.min.js`)
  if (cfg.virtuals.bs4) bs4Script.push(`${virtualDir('bajoWebMpa')}/bs4/js/bootstrap.bundle.min.js`)
  bs4Script.push(...commonScript)

  const bs4Css = []
  if (cfg.virtuals.bs4) bs4Css.push(`${virtualDir('bajoWebMpa')}/bs4/css/bootstrap.min.css`)
  bs4Css.push(...commonCss)

  const themes = [{
    name: 'bootstrap5',
    description: 'Bootstrap 5.3',
    script: bs5Script,
    css: bs5Css,
    icon,
    mapping
  }, {
    name: 'bootstrap4',
    description: 'Bootstrap 4.6',
    script: bs4Script,
    css: bs4Css,
    icon,
    mapping
  }]
  return themes
}

export default themes
