import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) && !store.state.loggedIn) {
    next({path: 'login', query: { redirect: from.query.redirect || from.path }});
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
