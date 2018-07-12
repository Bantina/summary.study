<template lang="html">
  <div class="voicer-media">
    <p>{{message}}</p>
    <sound-wave ref="soundWave" :rgb='{r: 7, g: 74, b: 130}'></sound-wave>
  </div>
</template>

<script>
import soundWave from './soundWave.vue'
// import volumeCheck from './volumeCheck.js'
export default {
  name: 'voicerMedia',
  data () {
    return {
      message: '', // 提示语
      audioCtx: null,
      sampleRate: 44100,
      bitRage: 128,
      audioStream: null, // 存储录制的音频流
      audioVolumeNode: {
        'source': null,
        'scriptNode': null
      },
      audioNode: { // 音频节点
        'source': null,
        'scriptNode': null
      },
      recorderWorker: null, // 录音线程
      volumecheckWorkerPath: require('./volume-check.js')
    }
  },
  props: {
    // sampleRate: { // 录音的采样率
    //   type: Number,
    //   default: 44100
    // },
    // bitRage: {
    //   type: Number,
    //   default: 128
    // }
  },
  components: {
    soundWave
  },
  mounted () {
    this.$nextTick(() => {
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      this.initMedia(false)
    })
    // 1. 初始化录音设备
    // 2. 开启一个线程实现录音功能
    // 3. 获取录音的音频流对其进行大小分析
    // 4. 将大小传递到主线程改变相应UI
  },
  methods: {
    /*
    * 获取麦克风权限
    * @isProcessStream Boolean 是否需要处理音频流，首次加载不要要，传false
    */
    initMedia (isProcessStream) {
      if (!window.AudioContext) {
        console.log('当前浏览器不支持Web Audio API')
        return
      }

      if (!this.audioCtx) {
        this.audioCtx = new window.AudioContext() // 创建音频上下文
      }

      this.sampleRate = this.audioCtx.sampleRate // 采样率

      let constraints ={ // 所需要的的媒体设备
        audio: true
      }

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(stream => this.gotStream(stream, isProcessStream))['catch'](
          this.mediaError
        )
      } else if (navigator.getUserMedia) {
        navigator.getUserMedia(constraints, stream => this.gotStream(stream, isProcessStream), this.mediaError)
      } else {
        // 实时监测麦克风是否被拔出
        navigator.mediaDevices.ondevicechange = function (event) {
          this.updateDeviceList()
        }
      }
    },

    /*
    * 麦克风检测成功，获取音频流
    */
    gotStream (stream, bool) {
      this.audioStream = stream
      if (!bool) {
        this.message = '麦克风检测通过'
      }
      this.recorderWorker = this.setRecorderWorker(this.volumecheckWorkerPath)
      this.processStream()
    },

    /*
    * 处理音频流
    */
    processStream () {
      try {
        this.audioVolumeNode.source = this.audioCtx.createMediaStreamSource(this.audioStream)
      } catch (err) {
        this.mediaError({name: 'CreateMediaStreamSourceError'})
      }

      // 创建一个音频分析对象，用于音量条音频，录制音频少，触发频率高
      // 音量检测，采样频率小，所以单独创建一个
      this.audioVolumeNode.scriptNode = this.audioCtx.createScriptProcessor(this.getBufferSize(), 1, 1)

      // 初始化音量检测
      this.recorderWorker.init(this.audioCtx.sampleRate)

      this.audioVolumeNode.scriptNode.onaudioprocess = e => this.recorderWorker.sendData(e.inputBuffer.getChannelData(0))

      this.audioVolumeNode.source.connect(this.audioVolumeNode.scriptNode)
      this.audioVolumeNode.scriptNode.connect(this.audioCtx.destination)

      // 创建一个音频节点
      this.audioNode.source = this.audioCtx.createMediaStreamSource(this.audioStream)

      // 创建一个音频处理对象
      this.audioNode.scriptNode = this.audioCtx.createScriptProcessor(16384, 1, 1)

      // 初始化音量检测
      this.recorderWorker.init(this.audioCtx.sampleRate)

      // this.audioNode.scriptNode.onaudioprocess = function (e) {
      //   send
      // }
    },

    /*
    * 获取麦克风错误
    */
    mediaError (e) {
      let error = {}
      if (e.name === ('PermissionDeniedError') || 'NotAllowedError') {
        error.errorCode = '1101'
        error.errorMsg = '请求麦克风权限被拒绝'
      } else if (e.name === 'NotFoundError') {
        error.errorCode = '1102'
        error.errorMsg = '打开麦克风失败'
      } else if (e.name === 'SecurityError') {
        error.errorCode = '1103'
        error.errorMsg = '设备被禁用'
      } else if (e.name === 'NotSupportedError') {
        error.errorCode = '1104'
        error.errorMsg = '仅允许安全的origins访问, 如https'
      } else if (e.name === 'CreateMediaStreamSourceError') {
        error.errorCode = '1105'
        error.errorMsg = '创建媒体流错误，浏览器版本不支持'
      } else {
        console.log(`mediaError: ${e}`)
        error.errorCode = '2000'
        error.errorMsg = '获取麦克风失败，原因不明'
      }
      this.message = `${error.errorCode}: ${error.errorMsg}`
      return error
    },

    /*
    * 音量检测线程
    * @path 线程地址
    */
    setRecorderWorker (path) {
      let volumecheckWorker = new Worker(path)
      volumecheckWorker.onmessage = (e) => {
        let volume = e.data.volume
        // volumeCheck.listen(volume)
        // 设置soundWave音量大小
        this.$refs.soundWave.setVolume(volume)
      }

      let init = (sampleRate) => {
        volumecheckWorker.postMessage({
          command: 'init',
          config: {
            sampleRate: this.sampleRate,
            outputBufferLength: this.getBufferSize()
          }
        })
      }

      let reset = function () {
        volumecheckWorker.postMessage({
          command: 'reset'
        })
      }

      let sendData = function (data) {
        volumecheckWorker.postMessage({
          command: 'record',
          buffer: data
        })
      }

      return {
        'init': init,
        'reset': reset,
        'sendData': sendData
      }
    },

    /*
    * 获取麦克风错误
    */
    getBufferSize () {
      let ua = navigator.userAgent
      if (/(Win(dows )?NT 6\.2)/.test(ua)) { // Windows 8
        return 1024
      } else if (/(Win(dows )?NT 6\.1)/.test(ua)) { // Windows 7
        return 1024
      } else if (/(Win(dows )?NT 6\.0)/.test(ua)) { // Windows Vista
        return 2048
      } else if (/Win(dows )?(NT 5\.1|XP)/.test(ua)) { // Windows XP
        return 4096
      } else if (/Mac|PPC/.test(ua)) { // Mac OS X
        return 1024
      } else if (/Linux/.test(ua)) { // Linux
        return 8192
      } else if (/iPhone|iPad|iPod/.test(ua)) { // iOS
        return 2048
      } else { // Otherwise
        return 16384
      }
    }
  }
}
</script>

<style lang="less">
</style>
