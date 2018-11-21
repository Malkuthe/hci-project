import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config.json'
import testdata from '@/data/testdata.json'
import userdata from '@/data/user.json'
import coursedata from '@/data/courses.json'

Vue.use(Vuex)

const mutations = {
  login(state) {
    state.loggedIn = true
  },
  logout(state) {
    state.loggedIn = false
  },
  resetLogoutTimer(state) {
    state.logoutTimer = state.logoutTime
  },
  decrementLogoutTimer(state) {
    state.logoutTimer--
  },
  editUserData(state, data) {
    Vue.set(state.mockUser,data.key,data.data);
  }
}

const getters = {
  findCourse: (state) => (code) => {
    var i, j
    for (i = 0; i < state.courses.terms.length; i++) {
      var term = state.courses.terms[i].code
      for(j = 0; j < state.courses.departments.length; j++) {
        var dept = state.courses.departments[j].code
        if(state.courses[term][dept].courses.includes(code)) {
          return state.courses[term][dept][code]
        }
      }
    }

    return null
  }
}

export default new Vuex.Store({
  state: {
    testdata,
    line: "checking if this is accessible",
    mockUser: userdata,
    courses: coursedata,
    loggedIn: false,
    logoutTime: config.logoutTime,
    logoutTimer: config.logoutTime
  },
  mutations: mutations,
  actions: {

  },
  getters: getters
})
