<template>
  <div id='home' class="card">
    <h2 id='personal-info-title'>{{pinfo}}</h2>
    <basic-info />
    <h2 id='academic-info-title'>{{acdemic}}</h2>
    <div id='academic-info-links'>
      <router-link to='/lookup'>Look up Classes</router-link>
      <router-link to='/registration-information'>Registration Time and Status</router-link>
      <router-link to='/edit-registration'>Drop Courses</router-link>
      <router-link to='/current-registration'>My Courses</router-link>
      <router-link to='/schedule'>My Weekly Schedule</router-link>
      <router-link to='/grades'>Grades</router-link>
      <router-link to='/registration-history'>Registration History</router-link>
      <router-link to='/exams'>Exams</router-link>
    </div>
    <h2 id='financial-information-title'>{{finance}}</h2>
    <div id='financial-information'>
      <table>
        <tr>
          <th>Term</th>
          <th>Total amount due</th> 
          <th>Due Date</th>
        </tr>
        <tr>
          <td>null</td>
          <td>null</td>
          <td>null</td>
        </tr>
      </table>
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
      acdemic: "Acdemic",
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
    grid-column: 1 / -1;
    grid-row: 4 / 5;
  }

  #financial-information {
    grid-column: 1 / -1;
    grid-row: 5 / 6;
  }

}

table {
    width:40%;
}
table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
th, td {
    padding: 15px;
    text-align: left;
}
table tr:nth-child(even) {
    background-color: #eee;
}
table tr:nth-child(odd) {
   background-color: #fff;
}
table th {
    background-color: grey;
    color: white;
}
</style>