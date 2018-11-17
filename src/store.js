import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config.json'
import testdata from '@/data/testdata.json'
import userdata from '@/data/user.json'

Vue.use(Vuex)

const mutations = {
  login(state) {
    state.loggedIn = true
  },
  logout(state) {
    state.loggedIn = false
  },
  resetLogoutTimer(state) {
    state.logoutTimer = state.logoutTime;
  },
  decrementLogoutTimer(state) {
    state.logoutTimer--;
  }
}

export default new Vuex.Store({
  state: {
    testdata,
    line: "checking if this is accessible",
    mockUser: userdata,
    loggedIn: false,
    logoutTime: config.logoutTime,
    logoutTimer: config.logoutTime
  },
  mutations: mutations,
  actions: {

  },
  getters: {
    
  }
})
