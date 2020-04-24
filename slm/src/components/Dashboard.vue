<template>
  <div>
    <v-app>
    <Toolbar2></Toolbar2>
    <div id="dashboard">
      <h2 id = "welcomeuser">Welcome</h2>
      <h2>Dashboard</h2>
      <h4 font-weight="bold">Your Enrolled Modules</h4>
      <!-- going through the modules -->
      <v-container class="my-5" v-for="mod in modules" :key="mod">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="enrolled in mod.enrolled" :key="enrolled" @click="handleClick(enrolled)"> 
          <v-hover
        v-slot:default="{ hover }">
          <v-card class="text-center ma-3" :elevation="hover ? 16 : 2">  
             {{enrolled}} 
          </v-card>
          </v-hover>
          </v-flex>
         </v-layout>
         </v-container>      
         <!-- <!-v-btn id="analytics" @click.prevent="analytics()">Analytics<!/v-btn>  -->
         <div id = "charts">
         <div id ="myCharts">
         <BarChart></BarChart>
         </div>
         <div id ="myCharts">
         <DoughnutChart></DoughnutChart>
         </div>
         </div>
    </div> 
  </v-app>
  </div>
</template>

<script>
//import LineExample from '../modqnstats.js'
import Toolbar2 from "../layouts/Toolbar2";
import database from "../firebase.js";
import firebase from 'firebase';
import BarChart from '../barchart.js'
import DoughnutChart from '../doughnut.js'

//import moment from 'moment';

export default {
  components: {
    Toolbar2, BarChart, DoughnutChart
  },
  data: () => {
    return {
      showModal: false,
      modules: [],
      modulelist: [],
      questiondict:{},
      username: "",
      displaybarchart: false

    };
  },
  
 methods:{
   fetchItems: function(){   
      //get students'ENROLMENTS from database
      var userID =  firebase.auth().currentUser.uid;
     //console.log(userID)
      database.collection('users').get().then((querySnapShot) =>{
        //loop
        let item = {}    
        querySnapShot.forEach(doc=>{
          item=doc.data()
          if (item.uid == userID) {
            this.modules.push(item);
            for (var x = 0; x < item.enrolled.length; x++) {
              this.modulelist[x] = item.enrolled[x];
            }
            }
        })
      })

      
    },


   
    handleClick(mod) {
        this.$router.push({name: "module", params: { mod: mod}});
    },

   

    welcome() {
      var userid = firebase.auth().currentUser.uid;
      database.collection('users').doc(userid).get().then((doc) => {
      this.username = doc.get("username")
      document.getElementById("welcomeuser").innerHTML = "Welcome " + this.username + "!";
    })
    },
    },
    created() { 
      this.fetchItems()
      this.welcome()
    },
}

</script>

<style lang="scss" scoped>
#dashboard {
  position: center;
  padding-top: 2cm;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  overflow-x: hidden;
}

#myCharts {
height:50%;
  width:50%;
  border-style: solid;
  border-color:rgb(155, 84, 84);
  border-width: 1px;
  float:left;
}

#charts {
    content:"";
    display:table;
    clear:both;
}

#welcomeuser {
  font-family: "actor";  
  font-size: 50px;
}


</style>
