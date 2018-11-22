import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config.json'
import testdata from '@/data/testdata.json'
import userdata from '@/data/user.json'
import coursedata from '@/data/courses.json'
import { stateMerge } from 'vue-object-merge'

Vue.use(Vuex)

function isEmpty(object) {
  return Object.keys(object).length === 0
}

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
  },
  registerLecture(state, data) {
    stateMerge(state.mockUser.registeredCourses,data);
  },
  registerLab(state,data) {
    stateMerge(state.mockUser.registeredCourses,data);
  },
  waitlistLecture(state, data) {
    stateMerge(state.mockUser.waitlistedCourses,data);
  },
  waitlistLab(state,data) {
    stateMerge(state.mockUser.waitlistedCourses,data);
  },
  dropRegisteredLecture(state,data) {
    Vue.delete(state.mockUser.registeredCourses[data.term][data.dept][data.course],data.section)
    if(isEmpty(state.mockUser.registeredCourses[data.term][data.dept][data.course])) {
      Vue.delete(state.mockUser.registeredCourses[data.term][data.dept],data.course)
    }
    if(isEmpty(state.mockUser.registeredCourses[data.term][data.dept])) {
      Vue.delete(state.mockUser.registeredCourses[data.term],data.dept)
    }
    if(isEmpty(state.mockUser.registeredCourses[data.term])) {
      Vue.delete(state.mockUser.registeredCourses,data.term)
    }
  },
  dropRegisteredLab(state,data) {
    Vue.delete(state.mockUser.registeredCourses[data.term][data.dept][data.course],data.lab)
    Vue.delete(state.mockUser.registeredCourses[data.term][data.dept][data.course],data.lecture)
    if(isEmpty(state.mockUser.registeredCourses[data.term][data.dept][data.course])) {
      Vue.delete(state.mockUser.registeredCourses[data.term][data.dept],data.course)
    }
    if(isEmpty(state.mockUser.registeredCourses[data.term][data.dept])) {
      Vue.delete(state.mockUser.registeredCourses[data.term],data.dept)
    }
    if(isEmpty(state.mockUser.registeredCourses[data.term])) {
      Vue.delete(state.mockUser.registeredCourses,data.term)
    }
  },
  dropWaitlistedLecture(state,data) {
    Vue.delete(state.mockUser.waitlistedCourses[data.term][data.dept][data.course],data.section)
    if(isEmpty(state.mockUser.waitlistedCourses[data.term][data.dept][data.course])) {
      Vue.delete(state.mockUser.waitlistedCourses[data.term][data.dept],data.course)
    }
    if(isEmpty(state.mockUser.waitlistedCourses[data.term][data.dept])) {
      Vue.delete(state.mockUser.waitlistedCourses[data.term],data.dept)
    }
    if(isEmpty(state.mockUser.waitlistedCourses[data.term])) {
      Vue.delete(state.mockUser.waitlistedCourses,data.term)
    }
  },
  dropWaitlistedLab(state,data) {
    Vue.delete(state.mockUser.waitlistedCourses[data.term][data.dept][data.course],data.lab)
    Vue.delete(state.mockUser.waitlistedCourses[data.term][data.dept][data.course],data.lecture)
    if(isEmpty(state.mockUser.waitlistedCourses[data.term][data.dept][data.course])) {
      Vue.delete(state.mockUser.waitlistedCourses[data.term][data.dept],data.course)
    }
    if(isEmpty(state.mockUser.waitlistedCourses[data.term][data.dept])) {
      Vue.delete(state.mockUser.waitlistedCourses[data.term],data.dept)
    }
    if(isEmpty(state.mockUser.waitlistedCourses[data.term])) {
      Vue.delete(state.mockUser.waitlistedCourses,data.term)
    }
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
