<template>
  <div class = drop>
    <h2>Registration Time and Status</h2>
    <h4 id = courseinfo>You may register during the following times</h4>
    <table class="t01">
  <tr>
    <th>From</th>
    <th>Begin Time</th> 
    <th>To</th>
    <th>End Time </th>
  </tr>
  <tr>
    <td>Jul 25, 2018</td>
    <td>09:00 am</td>
    <td>May 08, 2019</td>
    <td>11:59 pm</td>
    </tr>
</table>
 <h4 id = course>&#10004; You have no Holds which prevent registration!</h4>
  <h4 id = course>&#10004; Your Academic Standing permits registration!</h4>
   <h4 id = course>&#10004; Your Sudent Status permits registration!</h4>
    <h3 id = courseinfo>Student Information</h3>
<table class = "t02">
 <tr>
    <th>Program: </th>
    <td>Science-BSc Major</td>
    </tr>
    <tr>
    <th>Faculty: </th>
    <td>Faculty of Science</td>
    </tr>
    <tr>
    <th>Major: </th>
    <td>Computer Science</td>
    </tr>
    <tr>
    <th>Level: </th>
    <td>Undergraduate</td>
    </tr>
    </table>
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