<template>
  <div id="app">
    <navbar />
    <div id="main">
      <div id="content">
        <transition name="slide-left">
          <router-view />
        </transition>
      </div>
      <div id="footer-container"><hci-footer /></div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Navbar,
    hciFooter: Footer
  },
  computed: {
    ...mapState([
      'loggedIn'
    ])
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">

.slide-left-enter-active {
  transition: 0.33s;
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-left-leave-to {
  transform: translateX(50px);
  display: none;
}

body {
  margin: 0px;
  min-height: 100vh;
  background: $pale-grey;
}

#app {
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  display: grid;
  grid-gap: 0;
  grid-template-columns: 1fr 70vw 1fr;
  grid-template-rows: 85px auto;

  #main {
    grid-column: 1 / -1;
    grid-row: 2 / 3;
    display: grid;
    padding-top: 80px;
    grid-template-columns: inherit;
    grid-template-rows: auto 30px;

      #content {
      width: 100%;
      max-width: 70vw;
      padding-bottom: 80px;
      grid-row: 1 / 2;
      grid-column: 2 / 3;
    }
  }

  #nav {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
  }

  #footer-container {
    grid-column: 1 / -1;
    grid-row: -2 / -1;
    display: grid;
    grid-template-columns: inherit;
    background: $very-dark-grey;
    padding: 10px 5px;

    #footer {
      grid-column: 2 / -2;
      color: $pale-blue-grey;
      font-size: 70%;

      a {
        text-decoration: none;
        color: $gold;
      }
    }
  }
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>