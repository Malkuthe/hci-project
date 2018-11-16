<template>
  <div id="app">
    <navbar />
    <router-view :key='$router.testV'/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { mapState } from 'vuex';

export default {
  name: 'app',
  components: {
    Navbar
  },
  computed: {
    ...mapState([
      'loggedIn'
    ])
  }
}
</script>


<style lang="scss">
body {
  margin: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
