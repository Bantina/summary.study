let audioCtx = null

window.AudioContext = window.AudioContext || window.webkitAudioContext

(function () {


  function initMedia (isProcessStream) {
    if (!window.AudioContext) {
      console.log('当前浏览器不支持Web Audio API')
      return
    }

    if (!audioCtx) {
      audioCtx = new window.AudioContext() // 创建音频上下文
    }
  }

})()

