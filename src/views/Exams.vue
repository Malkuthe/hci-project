<template>
  <div class = drop>
    <h2>My Exams</h2>
    <h4 id = courseinfo>Select Term <button id = button type="button">Winter 2016</button></h4>
    <table id="t01">
  <tr>
    <th>Exam Date</th>
    <th>Exam Time</th> 
    <th>Subject</th>
    <th>Course#</th>
    <th>Scetion</th>
    <th>CRN</th>
    <th>Course Title</th>
    <th>Location</th>
  </tr>
  <tr>
    <td>Monday Apr 25, 2016</td>
    <td>6pm-8pm</td>
    <td>COMP</td>
    <td>2140</td>
    <td>A01</td>
    <td>452356</td>
    <td>Data Structures and Algorithms</td>
    <td>TBA</td>
  </tr>
   <tr>
    <td>Friday Apr 22, 2016</td>
    <td>2pm-5pm</td>
    <td>DAGR</td>
    <td>0490</td>
    <td>K01</td>
    <td>618519</td>
    <td>Applied Farm Management</td>
    <td>EITC E2 180</td>
  </tr>
  <tr>
    <td>Monday Apr 25, 2016</td>
    <td>9am-12pm</td>
    <td>COMP</td>
    <td>2150</td>
    <td>A02</td>
    <td>164456</td>
    <td>Introduction to Computer Systems</td>
    <td>TBA</td>
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
  margin-left: 30px
};
#button{
  margin-left: 10px;
};
table {
    margin-left: 30px;
    width:100%;
}
table,th {
    border: 1px solid black;
    border-collapse: collapse;
}
td {
    border: 1px solid white;
    border-collapse: collapse;
}
th, td {
    padding: 10px;
    text-align: left;
}
table tr:nth-child(even) {
    background-color: #eee;
}
table tr:nth-child(odd) {
   background-color: #fff;
}
td:nth-child(1){
  text-align: center;
}
table th {
    background-color: grey;
    color: white;
}
</style>