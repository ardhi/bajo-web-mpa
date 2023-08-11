import { Environment } from 'nunjucks'
import tplLoader from './tpl-loader.js'
import addGlobal from './global.js'
import addFilter from './filter.js'

async function view () {
  const { getConfig, importPkg } = this.bajo.helper
  const { cloneDeep, omit } = await importPkg('lodash-es')
  const cfg = getConfig('bajoWebMpa')
  const opts = cloneDeep(omit(cfg.nunjucks, ['web', 'express']))

  const Loader = await tplLoader.call(this)
  const env = new Environment(new Loader(), opts)
  this.bajoWebMpa.viewEngine = env
  await addGlobal.call(this)
  await addFilter.call(this)
}

export default view
