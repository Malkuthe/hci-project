<template>
  <div class = Schedule>
    <h2>My Weekly Schedule</h2>
    <h4 id = courseinfo>Select Term <button id = button type="button">Summer 2018</button></h4>
    <h4 id = courseinfo>Week#<button id = button type="button">week 6</button></h4>
    <table id="t01">
  <tr>
    <th></th>
    <th>Monday</th> 
    <th>Tuesday</th>
    <th>Wednesday</th>
    <th>Thursday</th>
    <th>Friday</th>
    <th>Saturday</th>
    <th>Sunday</th>
  </tr>
  <tr>
    <td>11am</td>
    <td>Comp 3020-A01 Lecture 11:00 am - 11:50 am EITC E2 105</td>
    <td></td>
    <td>Comp 3020-A01 Lecture 11:00 am - 11:50 am EITC E2 105</td>
    <td></td>
        <td>Comp 3020-A01 Lecture 11:00 am - 11:50 pm EITC E2 105</td>
    <td></td><td></td>
    </tr>
    <tr>
    <td>12pm</td>
    <td>MATH 1240-B10 Tutorial 12:00 pm - 12:50 pm ALLEN BUILDING 330</td>
    <td></td><td></td><td></td><td></td><td></td><td></td>
    </tr><tr>
    <td>1pm</td>
    <td></td> <td></td> <td></td>
     <td>MATH 1240-B10 Tutorial 12:00 pm - 12:50 pm ALLEN BUILDING 330</td> <td></td> <td></td><td></td>
    </tr><tr>
    <td>2pm</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr><tr>
    <td>3pm</td>
    <td>MATH 1240-A03 Lecture 3 pm - 3:50 pm ARMES 204</td>
    <td></td>
    <td>MATH 1240-A03 Lecture 3 pm - 3:50 pm ARMES 204</td>
    <td></td>
    <td>MATH 1240-A03 Lecture 3 pm - 3:50 pm ARMES 204</td>
    <td></td><td></td>
    </tr><tr>
    <td>4pm</td>
    <td></td>
    <td>Comp 3380-A01 Lecture 4pm- 4:50 pm EITC E2 110</td>
    <td></td>
    <td>Comp 3380-A01 Lecture 4pm- 4:50 pm EITC E2 110</td><td></td><td></td><td></td>
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
    padding: 3px;
    text-align: left;
}
table tr:nth-child(even) {
    background-color: #eee;
}
table tr:nth-child(odd) {
   background-color: #fff;
}
td:nth-child(1){
   padding: 45px;
   border: 1px solid black;
    border-collapse: collapse;
     background-color: grey;
    color: white;
}
table th {
    background-color: grey;
    color: white;
}
</style>