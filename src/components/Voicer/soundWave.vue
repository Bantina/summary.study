<template lang="html">
  <div class="wave-wrapper" ref="soundWave"></div>
</template>

<script>
// import volumeCheck from './volumeCheck.js'
export default {
  name: 'soundWave',
  data () {
    return {
      K: 2,
      F: 6, // 波峰
      phase: 0,
      volume: 0,
      MAX: (this.height / 2) - 4,
      run: false,
      canvas: document.createElement('canvas'),
      container: document.body
    }
  },
  props: {
    width: {
      type: Number,
      default: devicePixelRatio * 700
    },
    height: {
      type: Number,
      default: devicePixelRatio * 100
    },
    speed: {
      type: Number,
      default: 0.1
    },
    // volume: {
    //   type: Number,
    //   default: 0
    // },
    lineWidth: {
      type: Number,
      default: 1
    },
    // container: {
    //   default: function () {
    //     return document.getElementsByClassName('wave-wrapper')
    //   }
    // },
    rgb: {
      type: Object,
      default: function () {
        return {
          r: 0,
          g: 0,
          b: 0
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.container = this.$refs.soundWave
      this.start()
    })
  },
  methods: {
    soundWave () {
      // this.width = devicePixelRatio * (this.option.width || 700)
      // this.height = devicePixelRatio * (this.option.height || 100)

      // this.MAX = (this.height / 2) - 4

      // this.canvas = document.createElement('canvas')
      this.canvas.id = `canvas${new Date().getTime()}`
      this.canvas.width = this.width
      this.canvas.height = this.height
      this.canvas.style.width = `${(this.width / devicePixelRatio)}px`
      this.canvas.style.height = `${(this.height / devicePixelRatio)}px`

      this.container.appendChild(this.canvas)
      this.ctx = this.canvas.getContext('2d')
    },

    globalAttenuationFn (x) {
      return Math.pow(this.K * 4 / (this.K * 4 + Math.pow(x, 4)), this.K * 2)
    },

    drawLine (attenuation, color) {
      let x, y
      this.ctx.moveTo(0, 0)
      this.ctx.beginPath()
      this.ctx.strokeStyle = color
      this.ctx.lineWidth = this.lineWidth
      for (let i = -this.K; i <= this.K; i += 0.01) {
        x = this.width * ((i + this.K) / (this.K * 2))
        y = this.height / 2 + this.volume * this.globalAttenuationFn(i) * (1 / attenuation) * Math.sin(this.F * i - this.phase)
        this.ctx.lineTo(x, y)
      }
      this.ctx.stroke()
    },

    clear () {
      this.ctx.globalCompositeOperation = 'destination-out'
      this.ctx.fillRect(0, 0, this.width, this.height)
      this.ctx.globalCompositeOperation = 'source-over'
    },

    drawLines () {
      let r = this.rgb.r
      let g = this.rgb.g
      let b = this.rgb.b
      this.drawLine(-2, `rgba(${r}, ${g}, ${b}, 0.1)`)
      this.drawLine(-6, `rgba(${r}, ${g}, ${b}, 0.2)`)
      this.drawLine(4, `rgba(${r}, ${g}, ${b}, 0.4)`)
      this.drawLine(2, `rgba(${r}, ${g}, ${b}, 0.6)`)
      this.drawLine(1, `rgba(${r}, ${g}, ${b}, 1)`)
    },

    draw () {
      if (!this.run) return
      this.phase = (this.phase + this.speed) % (Math.PI * 64)
      this.clear()
      let r = this.rgb.r
      let g = this.rgb.g
      let b = this.rgb.b
      this.drawLine(-2, `rgba(${r}, ${g}, ${b}, 0.1)`)
      this.drawLine(-6, `rgba(${r}, ${g}, ${b}, 0.2)`)
      this.drawLine(4, `rgba(${r}, ${g}, ${b}, 0.4)`)
      this.drawLine(2, `rgba(${r}, ${g}, ${b}, 0.6)`)
      this.drawLine(1, `rgba(${r}, ${g}, ${b}, 1)`)
      // this.setVolume(0.4)
      requestAnimationFrame(this.draw.bind(this), 1000)
    },

    start () {
      this.soundWave()
      this.phase = 0
      this.run = true
      this.draw()
    },

    stop () {
      this.run = false
      this.clear()
    },

    setVolume (v) {
      this.volume = Math.min(v, 1) * this.MAX
    },

    setSpeed (v) {
      this.speed = v
    },

    set (volume, speed) {
      this.setVolume(volume)
      this.setSpeed(speed)
    },

    destroy () {
      let canvasDom = document.getElementById(this.canvas.id)
      if (canvasDom) {
        canvasDom.parentNode.removeChild(canvasDom)
      }
    }
  }
}
</script>

<style lang="less">
.wave-wrapper{
  height: 100%;
  width: 100%;
  text-align: center;
}
</style>
