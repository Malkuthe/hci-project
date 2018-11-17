import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log(store.state.line)
  if (to.matched.some(record => record.meta.requiresLogin) && !store.state.loggedIn) {
    next({path: 'login', query: { 
      redirect: from.query.redirect || 
      ( from.path == '/logout' ? '/' : from.path ) }});
  } else if (to.path.toLowerCase() == '/logout') {
    next();
    store.commit('resetLogoutTimer')
    setTimeout(function() {logoutCountdown()},1000)
  } else {
    next();
  }
})

function logoutCountdown() {
  store.commit('decrementLogoutTimer');

  if (store.state.logoutTimer == 0) {
    router.push('/');
  } else {
    setTimeout(function() {logoutCountdown()},1000)
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
