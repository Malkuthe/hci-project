import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserCircle)

Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
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
