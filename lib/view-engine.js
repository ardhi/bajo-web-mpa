class ViewEngine {
  constructor (plugin, name, fileExts = []) {
    this.plugin = plugin
    this.name = name
    this.fileExts = typeof fileExts === 'string' ? [fileExts] : fileExts
  }

  async render (tplFile, params, reply) {
    const { fs } = this.plugin.app.bajo.lib
    const { getTplFileAndTheme } = this.plugin.app.bajoWebMpa
    const { file } = getTplFileAndTheme(tplFile)
    return fs.readFileSync(file, 'utf8')
  }

  async renderString (text, params = {}, opts = {}) {
    return text
  }

  createComponent ($) {}
}

export default ViewEngine
