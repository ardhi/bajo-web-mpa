import loader from './loader.js'
import theme from './theme.js'
import global from './global.js'
import filter from './filter.js'

async function view () {
  await theme.call(this)
  await loader.call(this)
  await global.call(this)
  await filter.call(this)
}

export default view
