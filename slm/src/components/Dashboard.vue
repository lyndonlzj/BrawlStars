<template>
  <div>
    <Toolbar2></Toolbar2>
    <h2>Dashboard</h2>
    <div id="dashboard">
      <h3 font-weight="bold">Your Enrolled Modules</h3>
         <v-container fluid grid-list-md bg fill-height text-xs-center>
              <v-layout row wrap>
    <v-flex xs4 class="my-2">
             
         <v-card
            v-for="mod in modules" :key="mod.mod_id"
            class="ma-3 pa-6"
            outlined
            tile
          >
          {{mod.mod_id}} 
          </v-card>
          </v-flex>
         </v-layout>
         </v-container>       

      <h3 font-weight="bold">Your past lectures</h3>
      <ul>
        <li v-for="lecture in lectures" v-bind:key="lecture.mod">
          {{lecture.lecture_id}} {{lecture.date}}
        </li>
      </ul>
    </div>
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
      lectures: [],
      modules: [],
    };
  },
  // created() {
  //   database.collection('lectures').onSnapshot(snapshot => {
  //     snapshot.forEach(doc => {
  //       const data = {
  //         'lecture_id': doc.data().lecture_id,
  //         'date': new Date(doc.data().date.seconds * 1000)
  //       };
  //       this.lectures.push(data);
  //     });
  //   });
  // },
 methods:{
   fetchItems: function(){   
      //get items from database
      
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
    }
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
.card {
  max-width: 350px;
    transform: scale(0.9);
    font-size: 16px;
    float: left
}
</style>
