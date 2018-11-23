<template>
  <div id='registration-history' class='card'>
    <h2>Registration History</h2>
    <div class='disclaimer'><fa-icon icon='exclamation-triangle' />  This page is only a mockup. There is no real interactivity available.  <fa-icon icon='exclamation-triangle' /></div>
    <form>
      <div class='field beside'>
        <label>Select Term:</label>
        <v-select v-model='term' :options='["Winter 2016"]' :disabled='true'/>
      </div>
    </form>
    <div class='info-table'>
      <div class='header'>
        <div class='status'>Status</div>
        <div>CRN</div>
        <div>Subject</div>
        <div>Course #</div>
        <div>Section</div>
        <div>Credit</div>
        <div class='title'>Course Title</div>
        <div class='level'>Level</div>
      </div>
      <div class='table-body'>
        <div class='row'>
          <div class='status'>Registered Jul 25, 2015</div>
          <div>50140</div>
          <div>COMP</div>
          <div>2140</div>
          <div>A01</div>
          <div>3.0</div>
          <div class='title'>Data Structures and Algorithms</div>
          <div class='level'>Undergraduate</div>
        </div>
        <div class='row'>
          <div class='status'>Registered Jul 25, 2015</div>
          <div>557433</div>
          <div>DAGR</div>
          <div>0490</div>
          <div>K01</div>
          <div>3.0</div>
          <div class='title'>Applied Farm Management</div>
          <div class='level'>Undergraduate</div>
        </div>
        <div class='row'>
          <div class='status'>Registered Jul 25, 2015</div>
          <div>557334</div>
          <div>DAGR</div>
          <div>0490</div>
          <div>L01</div>
          <div>0.0</div>
          <div class='title'>Applied Farm Management</div>
          <div class='level'>Undergraduate</div>
        </div>
        <div class='row'>
          <div class='status'>Registered Jul 25, 2015</div>
          <div>7598633</div>
          <div>COMP</div>
          <div>2150</div>
          <div>A02</div>
          <div>3.0</div>
          <div class='title'>Introduction to Computer Systems</div>
          <div class='level'>Undergraduate</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      term: "Winter 2016"
    } 
  },
}
</script>

<style lang="scss" scoped>
.info-table {
  .status {
    grid-column: 1 / 3;
  }

  .title {
    grid-column: 8 / 11; 
  }

  .level {
    grid-column: 11 / 13;
  }
}
</style>