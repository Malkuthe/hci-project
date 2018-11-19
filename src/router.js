import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Logout from '@/views/Logout.vue'
import Account from '@/views/Account.vue'
import Lookup from '@/views/LookupClasses.vue'
import RegistrationCurrent from '@/views/Registration/Current.vue'
import RegistrationEdit from '@/views/Registration/Edit.vue'
import RegistrationHistory from '@/views/Registration/History.vue'
import RegistrationInfo from '@/views/Registration/Information.vue'
import Exams from '@/views/Exams.vue'
import Grades from '@/views/Grades.vue'
import Schedule from '@/views/Schedule.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/logout',
      component: Logout
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/lookup',
      name: 'lookup',
      component: Lookup,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/current-registration',
      name: 'current-registration',
      component: RegistrationCurrent,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/edit-registration',
      name: 'edit-registration',
      component: RegistrationEdit,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/registration-history',
      name: 'registration-history',
      component: RegistrationHistory,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/registration-information',
      name: 'registration-information',
      component: RegistrationInfo,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/exams',
      name: 'exams',
      component: Exams,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/grades',
      name: 'grades',
      component: Grades,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
