(function (type='fixed', designWidth=720) {
  const metaEl = document.querySelector('meta[name="viewport"]');
  const docEle = document.documentElement
  function setRootWidth(){
      let width, scale;
      let clientWidth = docEle.clientWidth||docEle.getBoundingClientRect().width||document.body.clientWidth;
      // 适配安卓系统5以下，获取不到 设备宽度
      if (clientWidth === 0){
          clientWidth = 360
      }
      console.log('clientWidth', clientWidth)
      switch (type) {
          case 'fixed':
              width = designWidth;
              scale = clientWidth / designWidth;
              break;
          case 'rem':
              var dpr = window.devicePixelRatio || 1;
              width = clientWidth * dpr;
              scale = 1 / dpr;
              document.documentElement.style.fontSize = 100 * (clientWidth * dpr / designWidth) + "px";
              break;
      }
      metaEl.setAttribute('content', 'width=' + width + ',initial-scale=' + scale + ',maximum-scale=' + scale +
              ',minimum-scale=' + scale );
  }
  document.addEventListener('DOMContentLoaded', setRootWidth)
})()