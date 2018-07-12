<template lang="html">
  <div class="wrapper">
    <nav>
      <router-link class="link" to="/">首页</router-link>
      <router-link class="link" to="/test">test</router-link>
      <router-link class="link" to="/voicer">Voicer</router-link>
    </nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
body, html, .wrapper{
  width: 100%;
  height: 100%;
}
nav{
  height: 50px;
  line-height: 50px;
}
nav a{
  margin: 0 20px;
}
.content{
  height: calc(~'100% - 50px');
}
</style>
