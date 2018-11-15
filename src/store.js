import Vue from 'vue'
import Vuex from 'vuex'
import testdata from '@/data/testdata.json'

Vue.use(Vuex)

const mutations = {
  login(state) {
    state.loggedIn = true
  },
  logout(state) {
    state.loggedIn = false
  }
}

export default new Vuex.Store({
  state: {
    testdata,
    line: "checking if this is accessible",
    mockUser: {
      username: 'Test',
      password: '1234'
    },
    loggedIn: false
  },
  mutations: mutations,
  actions: {

  },
  getters: {
    
  }
})
