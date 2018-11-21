import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faUserCircle,
  faEdit,
  faExclamationTriangle,
  faChevronCircleLeft,
  faChevronCircleDown,
  faTimesCircle,
  faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Multiselect from 'vue-multiselect'

library.add([
  faUserCircle,
  faEdit,
  faExclamationTriangle,
  faChevronCircleLeft,
  faChevronCircleDown,
  faTimesCircle,
  faCheckCircle ])

Vue.component('fa-icon', FontAwesomeIcon)
Vue.component('v-select', Multiselect)

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