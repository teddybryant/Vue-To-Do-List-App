import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Toasted from 'vue-toasted';
import moment from 'moment'

Vue.use(require('vue-moment'));

Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
});

Vue.use(Toasted, {
  duration: 1500
})


Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
