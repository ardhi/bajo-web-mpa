import Component from './component.js'

class MpaComponent extends Component {
  tagOne (params) {
    params.tag = 'div'
  }

  tagThree (params) {
    params.tag = 'div'
    params.html = '<div class="wrapper">' + params.html + '</div>'
  }

  tagTwo (params) {
  }

  self (params) {
    params.tag = 'div'
    params.attr.class.push('self')
    params.selfClose = true
  }
}

export default MpaComponent
