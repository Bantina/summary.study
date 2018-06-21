<template lang="html">
  <div>
    <h1>Test</h1>
    <p>{{ num }}</p>
    <button @click="handleIncrement">+</button>
    <button @click="handleDecrement">-</button>
  </div>
</template>

<script>
export default {
  computed: {
    num () {
      return this.$store.state.count
    }
  },
  methods: {
    handleIncrement () {
      this.$store.commit('increment', { num: 3 })
    },
    handleDecrement () {
      this.$store.commit('decrement')
    }
  }
}
</script>

<style lang="css">
</style>
