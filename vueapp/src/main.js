import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// import HomeForum from './components/home/indexForum'
// import Login from './components//login/login'
// import HomeStore from './components/home/indexStore'


Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
