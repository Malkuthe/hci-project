<template>
  <div id="app">
    <navbar />
    <div id="main">
      <div id="content">
        <transition name="slide-left">
          <router-view mode='out-in'/>
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
.disclaimer {
  padding: 10px;
  font-size: 80%;
  color: $dark-blue;
  background-color: rgba($blue,0.2);
  border: 1px solid $dark-blue;
  border-radius: 3px;
  font-weight: normal;
  font-style: italic;
  margin-bottom: 1em;
}

.card {
  h2 {
    .link {
      font-size: 60%;
      position: relative;
      text-decoration: none;

      &:hover {
          text-decoration: none;
      }

      &:after{
          content:' ';
          position: absolute;
          background-color: $brown;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          transition: 0.33s;
      }

      &:hover:after {
          width: 100%;
      }
    }
  }
}

a {
  position: relative;
  text-decoration: none !important;

  &:hover {
      text-decoration: none !important;
  }

  &:after{
      content:' ';
      position: absolute;
      background-color: $brown;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      transition: 0.33s;
  }

  &:hover:after {
      width: 100%;
  }
}

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
    text-decoration: none;
    color: darken($brown,0.7);
    &.router-link-exact-active {
      color: darken($brown,20);
      border-bottom: 4px solid darken($brown,29);
    }
  }
}
</style>

// Info-table
<style lang="scss">
.info-table {
  display: grid;
  margin-top: 0.6em;
  grid-template-columns: repeat(12,1fr);
  grid-template-rows: auto;
  font-size: 90%;

  .table-body {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: inherit;
    grid-template-rows: auto;
    border: 1px solid $dark-grey;
    border-top: none;
    box-sizing: border-box;

    & > div:not(.row), & > div.row > div {
      min-height: 60px;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: center;
      border-right: 1px solid $grey;
      
      &:last-child {
          border-right: 0;
      }
    }

    & > div.row {
      grid-column: 1 / -1;
      min-height: 60px;
      display: grid;
      grid-template-columns: inherit;
      grid-template-rows: auto;
      border-bottom: 1px solid $grey;
      box-sizing: border-box;

      &:last-child {
        border-bottom: 0;
      }
    }
  }

  .header {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: inherit;
    grid-template-rows: auto;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid $dark-grey;
    margin-bottom: 0;
    align-items: center;
    justify-items: center;
    font-weight: bold;
    background-color: rgba($grey,0.25);
    box-sizing: border-box;

    div {
      width: 100%;
      height: 100%;
      min-height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid $grey;
    }
  }
}
</style>
