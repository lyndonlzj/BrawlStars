<template>
  <div>
    <v-app>
    <Toolbar2></Toolbar2>
    <div id="dashboard">
      <h2>Dashboard</h2>
      <h4 font-weight="bold">Your Enrolled Modules</h4>
      <!-- going through the modules -->
      <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="mod in modules" :key="mod.mod_id" @click="handleClick(mod.mod_id)">
          <v-hover
        v-slot:default="{ hover }">
          <v-card class="text-center ma-3" :elevation="hover ? 16 : 2">  
            {{mod.mod_id}} 
          </v-card>
          </v-hover>
          </v-flex>
         </v-layout>
         </v-container>       
    </div> 
  </v-app>
  </div>
</template>

<script>
import Toolbar2 from "../layouts/Toolbar2";
import database from "../firebase.js";
import firebase from 'firebase';
//import moment from 'moment';

export default {
  components: {
    Toolbar2
  },
  data: () => {
    return {
      showModal: false,
      modules: [],
      moduleInfo: [],
    };
  },
  
 methods:{
   fetchItems: function(){   
      //get students'ENROLMENTS from database
      var userID =  firebase.auth().currentUser.uid;
     //console.log(userID)
      database.collection('enrolments').get().then((querySnapShot) =>{
        //loop
        let item = {}    
        querySnapShot.forEach(doc=>{
          item=doc.data()
          if (item.user_id == userID) {
            this.modules.push(item)
            }
        })
      })
    },
    handleClick(mod) {
        this.$router.push({name: "module", params: { mod: mod}});
    },
    },
    created() {
      this.fetchItems()
    }
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

</style>
