import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import './assets/styles/base.css'

new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
})
