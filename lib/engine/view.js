import loader from './loader.js'
import theme from './theme.js'
import extend from './extend.js'

async function view () {
  await theme.call(this)
  await loader.call(this)
  for (const type of ['global', 'filter', 'extension']) {
    await extend.call(this, type)
  }
}

export default view
