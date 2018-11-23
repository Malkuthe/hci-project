<template>
  <div id='exams' class='card'>
    <h2>My Exams</h2>
    <div class='disclaimer'><fa-icon icon='exclamation-triangle' />  This page is only a mockup. There is no real interactivity available.  <fa-icon icon='exclamation-triangle' /></div>
    <form>
      <div class='field beside'>
        <label>Select Term:</label>
        <v-select v-model='term' :options='["Winter 2016"]' :disabled='true'/>
      </div>
    </form>
    <div class='info-table'>
      <div class='header'>
        <div>Exam Date</div>
        <div>Exam Time</div> 
        <div>Subject</div>
        <div>Course#</div>
        <div>Scetion</div>
        <div>CRN</div>
        <div>Course Title</div>
        <div>Location</div>
      </div>
      <div class='table-body'>
        <div class='row'>
          <div>Monday Apr 25, 2016</div>
          <div>6pm-8pm</div>
          <div>COMP</div>
          <div>2140</div>
          <div>A01</div>
          <div>452356</div>
          <div>Data Structures and Algorithms</div>
          <div>TBA</div>
        </div>
        <div class='row'>
          <div>Friday Apr 22, 2016</div>
          <div>2pm-5pm</div>
          <div>DAGR</div>
          <div>0490</div>
          <div>K01</div>
          <div>618519</div>
          <div>Applied Farm Management</div>
          <div>EITC E2 180</div>
        </div>
        <div class='row'>
          <div>Monday Apr 25, 2016</div>
          <div>9am-12pm</div>
          <div>COMP</div>
          <div>2150</div>
          <div>A02</div>
          <div>164456</div>
          <div>Introduction to Computer Systems</div>
          <div>TBA</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      term: 'Winter 2016'
    } 
  },
}
</script>

<style lang="scss" scoped>
.info-table {
  .header, .table-body .row {
    & > div {
      &:first-child {
        grid-column: 1 / 2;
      }

      &:nth-child(7) {
        grid-column: 8 / 11;
      }

      &:last-child {
        grid-column: 11 / 13;
      }
    }
  }
}
</style>