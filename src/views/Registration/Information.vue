<template>
  <div id='registration-time-and-status' class='card'>
    <h2>Registration Time and Status</h2>
    <div class='disclaimer'><fa-icon icon='exclamation-triangle' />  This page is only a mockup. There is no real interactivity available.  <fa-icon icon='exclamation-triangle' /></div>
    <h4 style='text-align: left;'>You may register during the following times</h4>
    <div class='info-table'>
      <div class='header'>
        <div>From</div>
        <div>Begin Time</div>
        <div>To</div>
        <div>End Time</div>
      </div>
      <div class='table-body'>
        <div class='row'>
          <div>Jul 25, 2018</div>
          <div>09:00 am</div>
          <div>May 08, 2019</div>
          <div>11:59 pm</div>
        </div>
      </div>
    </div>
    <div class='info'><fa-icon icon='check-circle' /> You have no holds which prevent registration.</div>
    <div class='info'><fa-icon icon='check-circle' /> Your Academic standing permits registration.</div>
    <div class='info'><fa-icon icon='check-circle' /> Your Student Status permits registration.</div>
    <div class='student-info'>
      <div><b>Program:</b></div>
      <div>Science-BSc Major</div>
      <div><b>Faculty:</b></div>
      <div>Faculty of Science</div>
      <div><b>Major:</b></div>
      <div>Computer Science</div>
      <div><b>Level:</b></div>
      <div>Undergraduate</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    } 
  },
}
</script>

<style lang="scss" scoped>
#registration-time-and-status {
  div {
    text-align: left;
  }

  .disclaimer {
    text-align: center;
  }

  .info {
    margin-top: 0.6em;
  }

  .student-info {
    margin-top: 1.2em;
    display: grid;
    grid-template-columns: 10% 30%;
    grid-template-rows: auto;
    grid-column-gap: 15px;
    grid-row-gap: 10px;

    div:nth-child(2n + 1) {
      text-align: right;
    }
  }
}

.info-table {
  width: 50%;

  .header div, .table-body .row div {
    &:nth-child(1) {
      grid-column: 1 / 4;
    }

    &:nth-child(2) {
      grid-column: 4 / 7;
    }

    &:nth-child(3) {
      grid-column: 7 / 10;
    }

    &:nth-child(4) {
      grid-column: 10 / 13;
    }
  }
}

#courseinfo{
  float: left;
  margin-left: 60px;
  margin-right : 60%;
};
#course{
  margin-left:110px;
  background-color:GhostWhite;
  float: left;
  margin-right : 40%;
};
#button{
  margin-left: 10px;
};
table.t02{
  float: left;
  border-collapse: collapse;
  color: black;
  width: 25%;
}
table.t02 td{
padding: 10px;
  text-align:left;
}
table.t02 th{
  text-align: right;
}
table {
    margin-left: 45px;
    float: left;
    width:60%;
}
table.t01, table.t01 th{
    border: 1px solid black;
    border-collapse: collapse;
}
table.t01, table.t01 td {
    border: 1px solid white;
    border-collapse: collapse;
    background-color:GhostWhite;
}
th, td {
    padding: 3px;
    text-align: left;
}

td:nth-child(1){
  text-align: center;
}
 table.t01 th {
    background-color: grey;
    color: white;
}
</style>