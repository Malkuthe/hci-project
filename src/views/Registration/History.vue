<template>
  <div class = drop>
    <h2>Registration History</h2>
    <h4 id = courseinfo>Select Term <button id = button type="button">Winter 2016</button></h4>
    <table id="t01">
  <tr>
    <th>Status</th>
    <th>CRN</th> 
    <th>Subject</th>
    <th>Course#</th>
    <th>Scetion</th>
    <th>Credit</th>
    <th>Course Title</th>
    <th>Level</th>
  </tr>
  <tr>
    <td>Registered Jul 25, 2015</td>
    <td>50140</td>
    <td>COMP</td>
    <td>2140</td>
    <td>A01</td>
    <td>3.0</td>
    <td>Data Structures and Algorithms</td>
    <td>Undergraduate</td>
  </tr>
   <tr>
    <td>Registered Jul 25, 2015</td>
    <td>557433</td>
    <td>DAGR</td>
    <td>0490</td>
    <td>K01</td>
    <td>3.0</td>
    <td>Applied Farm Management</td>
    <td>Undergraduate</td>
  </tr>
     <tr>
     <td>Registered Jul 25, 2015</td>
    <td>557334</td>
    <td>DAGR</td>
    <td>0490</td>
    <td>L01</td>
    <td>0.0</td>
    <td>Applied Farm Management</td>
    <td>Undergraduate</td>
  </tr>
  <tr>
    <td>Registered Jul 25, 2015</td>
    <td>7598633</td>
    <td>COMP</td>
    <td>2150</td>
    <td>A02</td>
    <td>3.0</td>
    <td>Introduction to Computer Systems</td>
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
    padding: 5px;
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