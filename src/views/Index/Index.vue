<script>
export default {
  data () {
    return {
      msg: 'Hello'
    }
  },
  render () {
    return (
      <div class="root">
        <span>{ this.msg }</span>
      </div>
    )
  }
}
</script>

<style lang="scss">
  .root span {
    font-size: 30px;
    font-weight: bold;
    color: rgb(245, 45, 144);
    cursor: pointer;
    &:hover {
      color: rgb(221, 70, 39);
    }
  }
</style>
