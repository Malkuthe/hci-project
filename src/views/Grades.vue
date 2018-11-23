<template>
  <div id='grades' class='card'>
    <h2>Final Grades</h2>
    <div class='disclaimer'><fa-icon icon='exclamation-triangle' />  This page is only a mockup. There is no real interactivity available.  <fa-icon icon='exclamation-triangle' /></div>
    <form>
      <div class='field beside'>
        <label>Select Term:</label>
        <v-select v-model='term' :options='["Winter 2015"]' :disabled='true'/>
      </div>
    </form>
    <div class='info-table'>
      <div class='header'>
        <div>Status</div>
        <div>CRN</div> 
        <div>Subject</div>
        <div>Course#</div>
        <div>Scetion</div>
        <div>Credit</div>
        <div>Final Grade</div>
        <div>Level</div>
      </div>
      <div class='table-body'>
        <div class='row'>
          <div>Grade received Apr 24, 2015</div>
          <div>50140</div>
          <div>COMP</div>
          <div>2140</div>
          <div>A01</div>
          <div>3.0</div>
          <div>A</div>
          <div>Undergraduate</div>
        </div>
        <div class='row'>
          <div>Grade received Apr 28, 2015</div>
          <div>557433</div>
          <div>DAGR</div>
          <div>0490</div>
          <div>K01</div>
          <div>3.0</div>
          <div>B</div>
          <div>Undergraduate</div>
        </div>
        <div class='row'>
          <div>Grade received May 04, 2015</div>
          <div>7598633</div>
          <div>COMP</div>
          <div>2150</div>
          <div>A02</div>
          <div>3.0</div>
          <div>A</div>
          <div>Undergraduate</div>
        </div>
        <div class='row'>
          <div>Grade NOT received</div>
          <div>28431</div>
          <div>COMP</div>
          <div>2190</div>
          <div>A03</div>
          <div>3.0</div>
          <div>—</div>
          <div>Undergraduate</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      term: 'Winter 2015'
    } 
  },
}
</script>

<style lang="scss" scoped>
.info-table {
  .header, .table-body .row {
    & > div {
      &:first-child {
        grid-column: 1 / 4;
      }

      &:last-child {
        grid-column: 10 / 13;
      }
    }
  }
}
</style>