<template>
  <div id='home' class="card">
    <h2 id='personal-info-title'>{{pinfo}} <router-link class='link' to='/account'>View Account Details <fa-icon icon='arrow-right' /></router-link></h2>
    <basic-info />
    <h2 id='academic-info-title'>{{academic}}</h2>
    <div id='academic-info-links'>
      <div><router-link to='/registration'>Register for Courses</router-link></div>
      <div><router-link to='/registration'>Lookup Classes</router-link></div>
      <div><router-link to='/registration-information'>Registration Time and Status</router-link></div>
      <div><router-link to='/registration/timetable'>My Weekly Schedule</router-link></div>
      <div><router-link to='/grades'>Grades</router-link></div>
      <div><router-link to='/registration-history'>Registration History</router-link></div>
      <div><router-link to='/exams'>Exams</router-link></div>
    </div>
    <h2 id='financial-information-title'>{{finance}}</h2>
    <div id='financial-information'>
      <div class='info-table'>
        <div class='header'>
          <div class='term'>Term</div>
          <div class='amount'>Total Amount Due</div>
          <div class='due'>Due Date</div>
        </div>
        <div class='table-body'>
          <div class='row'>
            <div class='term'>Fall 2016</div>
            <div class='amount'>$ 0.00</div>
            <div class='due'>14 September 2016</div>
          </div>
          <div class='row'>
            <div class='term'>Winter 2017</div>
            <div class='amount'>$ 0.00</div>
            <div class='due'>27 January 2017</div>
          </div>
          <div class='row'>
            <div class='term'>Fall 2017</div>
            <div class='amount'>$ 0.00</div>
            <div class='due'>18 September 2017</div>
          </div>
          <div class='row'>
            <div class='term'>Winter 2018</div>
            <div class='amount'>$ 0.00</div>
            <div class='due'>3 February 2018</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BasicInfo from '@/components/Account/BasicInfo.vue'

export default {
  name: 'home',
  components: {
    basicInfo: BasicInfo
  },
  data(){
    return{
      title: "Home Page",
      pinfo: "Personal Information",
      academic: "Academic",
      finance: "Finance"
    } 
  },
  computed: {
    ...mapState([
      'mockUser'
    ])
  }
}
</script>

<style lang="scss" scoped>
#home {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 30px;
  text-align: left;

  #personal-info-title {
    grid-column: 1 / 4;
    grid-row: 2 / 3;
  }

  #basic-info {
    grid-column: 1 / 4;
    grid-row: 3 / 4;
  }

  #academic-info-title {
    grid-column: 4 / -1;
    grid-row: 2 / 3;
  }

  #academic-info-links {
    grid-column: 4 / -1;
    grid-row: 3 / 4;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }

  #financial-information-title {
    grid-column: 1 / 4;
    grid-row: 4 / 5;
  }

  #financial-information {
    grid-column: 1 / 4;
    grid-row: 5 / 6;
  }

}

.info-table {

  .term {
    grid-column: 1 / 3;
  }

  .amount {
    grid-column: 3 / 9;
  }

  .due {
    grid-column: 9 / 13;
  }
}
</style>