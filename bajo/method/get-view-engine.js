async function render (tplFile, params, reply) {
  const { fs } = this.app.bajo.lib
  const { file } = this.getTplFileAndTheme(tplFile)
  return fs.readFileSync(file, 'utf8')
}

async function renderString (text, params = {}, opts = {}) {
  return text
}

function getViewEngine (ext) {
  const { find } = this.app.bajo.lib._
  const ve = find(this.viewEngines, v => v.fileExts.includes(ext))
  if (ve) return ve
  return {
    name: 'default',
    ns: this.name,
    fileExts: [],
    render,
    renderString
  }
}

export default getViewEngine
