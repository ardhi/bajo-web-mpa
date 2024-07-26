import path from 'path'

async function theme (ctx) {
  const { virtualDir } = this.app.bajoWebStatic
  const { importModule } = this.app.bajo
  const { camelCase } = this.app.bajo.lib._
  const { fastGlob } = this.app.bajo.lib

  const component = {}
  const files = await fastGlob(`${this.config.dir.pkg}/bajoWebMpa/theme/component/*.js`)
  for (const file of files) {
    const key = camelCase(path.basename(file, path.extname(file)))
    component[key] = await importModule(file)
  }

  const dir = virtualDir(this.name)
  const css = [
    dir + '/purecss/pure-min.css',
    dir + '/fa-free/css/fontawesome.min.css',
    dir + '/fa-free/css/regular.min.css',
    dir + '/fa-free/css/brands.min.css',
    dir + '/fa-free/css/solid.min.css'
  ]
  const meta = [{
    name: 'viewport',
    content: 'width=device-width, initial-scale=1'
  }]
  return {
    name: 'default',
    component,
    css,
    meta
  }
}

export default theme
