/* global $, helper */
const helper = {}
helper.bufferToObject = function (data) {
  const buffer = new Uint8Array(data)
  const text = String.fromCharCode.apply(null, buffer)
  return JSON.parse(text)
}

window.onload = function () {
  const imgDefer = document.getElementsByTagName('img')
  for (let i = 0; i < imgDefer.length; i++) {
    if (imgDefer[i].getAttribute('data-src')) {
      imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'))
    }
  }
  const container = $('.masonry')
  container.imagesLoaded(function () {
    container.masonry({
      percentPosition: true
    })
  })
}
