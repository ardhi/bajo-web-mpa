function tagOne (params) {
}

function tagThree (params) {
  params.html = '<div class="wrapper">' + params.html + '</div>'
}

function tagTwo (params) {
  params.tag = 'span'
}

function self (params) {
  params.attr.class.push('self')
  params.selfClose = true
}

async function view () {
  const me = this

  class Component extends me.BaseComponent {
    constructor ($) {
      super(me, $)
      Object.assign(this, { tagOne, tagThree, self, tagTwo })
    }
  }

  class ViewEngine extends me.BaseViewEngine {
    constructor () {
      super(me, 'default', '.html')
    }

    createComponent ($) {
      return new Component($)
    }
  }

  return new ViewEngine()
}

export default view
