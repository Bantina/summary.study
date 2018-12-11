<template lang="html">
  <section class="shadow-wrapper">
    <input class="img-input" type="file" accept="image/*">
    <div class="land">
      <div class="circle"></div>
    </div>
    <div class="lack"></div>
  </section>
</template>

<script>
export default {
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .shadow-wrapper{
    width: 100%;
    height: 100%;
    .land{
      height: 40%;
      -webkit-box-reflect: below 0 -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.1, transparent), to(rgba(255, 255, 255, 0.1)));
      z-index: 2;
      overflow: hidden;
      .circle{
        width: 100px;
        height: 100px;
        margin-top: 10%;
        border-radius: 50%;
        background: #204e08;
      }
    }
    .lack{
      height: 60%;
      background: #5ebdea;
      z-index: 1;
    }
  }
</style>
