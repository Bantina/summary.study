// ;(function () {
//   function newVolumeCheckWorker (path) {
//     let volumeCheckWorker = new Worker(path)
//     volumeCheckWorker.onmessage = function (e) {
//       let volume = e.data.volume
//       // volumeCheck.listen(volume)
//       return volume
//     }
//   }
// })()

let volumeCheck = (function () {
  let lowVolumeLimit = 8 // 最低音量限制
  let interval = 500 // 音量判定间隔
  let maxTooLow = 5 // 录音开始判定几次提示音量过小
  let maxVolume = 0
  let checkEventId = 0
  let isTooLow = false
  let tooLowCount = 0

  function init () {
    maxVolume = 0
    isTooLow = false
    tooLowCount = 0
  }

  function fire () {
    if (!isTooLow && maxVolume < lowVolumeLimit) {
      tooLowCount++
      if (tooLowCount >= maxTooLow) {
        isTooLow = true
        // 音量太小
      }
      return
    }
    if (isTooLow && maxVolume >= lowVolumeLimit) {
      // 正常音量
    }
    if (maxVolume >= lowVolumeLimit) {
      clearInterval(checkEventId)
      tooLowCount = 0
    }
  }

  function start () {
    init()
    checkEventId = setInterval(fire, interval)
  }

  function stop () {
    clearInterval(checkEventId)
  }

  function listen (volume) {
    maxVolume = Math.max(maxVolume, volume)
  }

  return {
    'start': start,
    'stop': stop,
    'listen': listen
  }
})()

export default volumeCheck
