import icon from './icon.js'
import mapping from './mapping.js'

async function themes () {
  const { virtualDir, assetDir } = this.bajoWebStatic.helper
  return [{
    name: 'bootstrap5',
    description: 'Bootstrap 5.3',
    script: [
      `${virtualDir('bajoWebMpa')}/jquery/jquery.min.js`,
      `${virtualDir('bajoWebMpa')}/bs5/js/bootstrap.bundle.min.js`,
      `${virtualDir('bajoWebMpa')}/bootbox/bootbox.min.js`,
      `${virtualDir('bajoWebMpa')}/masonry/masonry.pkgd.min.js`,
      `${virtualDir('bajoWebMpa')}/imagesloaded/imagesloaded.pkgd.min.js`,
      `${assetDir('bajoWebMpa')}/js/common.js`
    ],
    css: [
      `${virtualDir('bajoWebMpa')}/bs5/css/bootstrap.min.css`,
      `${virtualDir('bajoWebMpa')}/icons/font/bootstrap-icons.min.css`
    ],
    icon,
    mapping
  }, {
    name: 'bootstrap4',
    description: 'Bootstrap 4.6',
    script: [
      `${virtualDir('bajoWebMpa')}/jquery/jquery.min.js`,
      `${virtualDir('bajoWebMpa')}/bs4/js/bootstrap.bundle.min.js`
    ],
    css: [
      `${virtualDir('bajoWebMpa')}/bs4/css/bootstrap.min.css`,
      `${virtualDir('bajoWebMpa')}/icons/font/bootstrap-icons.min.css`
    ],
    icon,
    mapping
  }]
}

export default themes
