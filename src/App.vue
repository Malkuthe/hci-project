<template>
  <div id="app">
    <navbar />
    <div id="content">
      <router-view />
    </div>
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
  grid-template-columns: 1fr 70% 1fr;
  grid-template-rows: 85px auto;

  #content {
    width: 100%;
    max-width: 70vw;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }

  #nav {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
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
