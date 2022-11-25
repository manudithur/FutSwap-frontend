import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store/index';

Vue.config.productionTip = false

export default new Vue({
  vuetify: vuetify,
  store: store,
  router: router,

  render: h => h(App),
}).$mount('#app')