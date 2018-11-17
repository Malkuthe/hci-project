<template>
  <div class="home">
    <h1 id = title> {{title}} </h1>
    <hr noshade align = "left" width = 100%>
    <br>
    <p id = title style ="font-size: 20px;">{{pinfo}}</p>
    <hr align = "left" width = 100%>
    <ul>
      <li id = left><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target = "_blank" rel = "noopener">Change password</a></li>
      <li id = right><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">Email</a></li>
    </ul>
    <br>
    <ul>
      <li id = left><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target = "_blank" rel = "noopener">Adresses</a></li>
    </ul>
    <br>
    <ul>
      <li id = left><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target = "_blank" rel = "noopener">Phone Number</a></li>
    </ul>
    <br><br>
    <p id = title style ="font-size: 20px;">{{academic}}</p>
    <hr align = "left" width = 100%>
    <ul>
      <li id = left><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target = "_blank" rel = "noopener">Look up Classes</a></li>
      <li id = right><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">Registration Time and Status</a></li>
    </ul>
    <br>
    <ul>
      <li id = left><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target = "_blank" rel = "noopener">Drop courses</a></li>
      <li id = right><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">My courses</a></li>
    </ul>
    <br>
    <ul>
      <li id = left><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target = "_blank" rel = "noopener">My Weekly Schedule</a></li>
      <li id = right><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">My Grades</a></li>
    </ul>
    <br>
    <ul>
      <li id = left><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target = "_blank" rel = "noopener">Registration History</a></li>
      <li id = right><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">Exams</a></li>
    </ul>
    <br><br>
    <p id = title style ="font-size: 20px;">{{finance}}</p>
    <hr align = "left" width = 100%>
    <table id="t01">
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
</template>

<script>
export default {
  name: 'home',
  data(){
    return{
      title: "Home Page",
      pinfo: "Personal Information",
      academic: "Academic",
      finance: "Finance"
    } 
  }
}
</script>
<style scoped>

#title{
	float: left;
	margin-left: 10px;
	margin-right: 300px;
}
#left{
	float: left;
	margin-left : 10px;
}
#right{
	float: left;
	margin-left : 200px;
}

ul {
  list-style-type: none;
  font-size: 20px;
}
table {
    margin-top: 20px;
    margin-left: 45px;
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
table#t01 tr:nth-child(even) {
    background-color: #eee;
}
table#t01 tr:nth-child(odd) {
   background-color: #fff;
}
table#t01 th {
    background-color: grey;
    color: white;
}
</style>