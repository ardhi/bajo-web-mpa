import loader from './loader.js'
import theme from './theme.js'
import extend from './extend.js'
import util from './util.js'
// import nunjucks from 'nunjucks'

async function view () {
  // const { eachPlugins } = this.bajo.helper
  await util.call(this)
  await theme.call(this)
  await loader.call(this)
  for (const type of ['global', 'filter', 'extension']) {
    await extend.call(this, type)
  }
  // precompile custom tags
  // await eachPlugins(async function ({ file }) {
  //   nunjucks.precompile(file, { env: this.bajoWebMpa.viewEngine })
  // }, { glob: '**/*.njk' })
}

export default view
