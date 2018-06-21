/**
 * 移动端rem动态适配
 * @param  {Object} [props]  分母 和 设计稿大小
 * @return {[type]}          undefined
 */
;(function (props = {fontSize: 100, width: 750}) {
  const docEle = document.documentElement
  const radio = window.devicePixelRatio
  const scale = 1 / radio
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const meta = document.querySelector('meta[name=viewport]')

  meta.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')

  function refreshRem () {
    const clientWidth = docEle.getBoundingClientRect().width
    docEle.style.fontSize = props.fontSize * (clientWidth / props.width) + 'px'
  }

  window.addEventListener(resizeEvt, function () {
    clearTimeout(refreshRem.tid)
    refreshRem.tid = setTimeout(refreshRem, 300)
  }, false)

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(refreshRem.tid)
      refreshRem.tid = setTimeout(refreshRem, 300)
    }
  }, false)

  window.addEventListener('DOMContentLoaded', refreshRem, false)
})()
