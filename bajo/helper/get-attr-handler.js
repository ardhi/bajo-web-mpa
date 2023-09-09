import * as bs5 from '../../lib/get-attr/bootstrap5/index.js'
// import * as bs4 from '../../lib/get-attr/bootstrap5/index.js'
const bs4 = bs5

const getAttrHandler = {
  exec: function (theme) {
    if (theme === 'bootstrap4') return bs4
    return bs5
  }
}

export default getAttrHandler
