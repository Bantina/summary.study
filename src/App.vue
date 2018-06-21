<script>
export default {
  render () {
    return (
      <div>
        <router-link class="link" to="/">首页</router-link>
        <router-link class="link" to="/test">测试页</router-link>
        <router-view></router-view>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
  .link {
    margin: 20px;
  }
</style>
