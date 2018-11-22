<template>
  <div class = drop>
    <h2>My Courses</h2>
    <h4 id = courseinfo>Fall 2015</h4>
    <table id="t01">
  <tr>
    <th>Subject</th>
    <th>Course#</th>
    <th>Scetion</th>
     <th>CRN</th> 
    <th>Credit</th>
    <th>Course Title</th>
    <th>Instructors</th>
    <th>Meeting Time</th>
    <th>Level</th>
  </tr>
  <tr>
    <td>COMP</td>
    <td>2140</td>
    <td>A01</td>
    <td>50140</td>
    <td>3.0</td>
    <td>Data Structures and Algorithms</td>
    <td>Instructor 1&#9993;</td>
    <td>11:30am-12:45pm TR</td>
    <td>Undergraduate</td>
  </tr>
   <tr>
    <td>DAGR</td>
    <td>0490</td>
    <td>K01</td>
    <td>3.0</td>
    <td>557433</td>
    <td>Applied Farm Management</td>
    <td>Instructor 2&#9993;</td>
    <td>9:30am-10:45pm MWF</td>
    <td>Undergraduate</td>
  </tr>
     <tr>
    <td>DAGR</td>
    <td>0490</td>
    <td>L01</td>
        <td>557334</td>
    <td>0.0</td>
    <td>Applied Farm Management</td>
    <td>Instructor 2&#9993;</td>
    <td>1:30pm-3:00pm T</td>
    <td>Undergraduate</td>
  </tr>
  <tr>

    <td>COMP</td>
    <td>2150</td>
    <td>A02</td>
   <td>7598633</td>
    <td>3.0</td>
    <td>Introduction to Computer Systems</td>
    <td>Instructor 3&#9993;</td>
    <td>8:30am-9:20pm MWF</td>
    <td>Undergraduate</td>
  </tr>
</table>
<h4 id = courseinfo>Winter 2016</h4>
     <table id="t01">
  <tr>
    <th>Subject</th>
    <th>Course#</th>
    <th>Scetion</th>
     <th>CRN</th> 
    <th>Credit</th>
    <th>Course Title</th>
    <th>Instructors</th>
    <th>Meeting Time</th>
    <th>Level</th>
  </tr>
  <tr>
    <td>MATH</td>
    <td>2220</td>
    <td>A03</td>
      <td>954891</td>
    <td>3.0</td>
    <td>Applied calculus</td>
    <td>Instructor 4 &#9993;</td>
    <td>11:30am-12:20pm MWF</td>
    <td>Undergraduate</td>
  </tr>
   <tr>
    <td>DAGR</td>
    <td>1490</td>
    <td>K01</td>
    <td>556333</td>
     <td>3.0</td>
    <td>Applied Farm Management 2</td>
    <td>Instructor 2&#9993;</td>
    <td>8:30am-9:45pm TR</td>
    <td>Undergraduate</td>
  </tr>
     <tr>
    <td>DAGR</td>
    <td>1490</td>
    <td>L03</td>
        <td>557334</td>
    <td>0.0</td>
    <td>Applied Farm Management2</td>
    <td>Instructor 2&#9993;</td>
    <td>4:30pm-5:20pm F</td>
    <td>Undergraduate</td>
  </tr>
  <tr>

    <td>COMP</td>
    <td>4130</td>
    <td>A02</td>
   <td>4648626</td>
    <td>3.0</td>
    <td>Computer Systems 1</td>
    <td>Instructor 6&#9993;</td>
    <td>10:30am-11:45pm TR</td>
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
    padding: 8px;
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