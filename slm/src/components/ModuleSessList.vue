<template>
   <div>
     <v-app>
    <Toolbar2></Toolbar2>
    <div id = "style">
   <h4> Past Forum Sessions of {{this.mod}} </h4>
    <v-container class="my-5" >
      <v-layout column wrap>
        <v-flex v-for="sess in sessList" v-bind:key="sess" @click="handleClick(sess)">
          <v-hover
        v-slot:default="{ hover }">
          <v-card class="text-center ma-3" :elevation="hover ? 16 : 2">  
                 {{sess}} 
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
export default {
  props: ['mod'],
  components: {
    Toolbar2
  },
  data: () => {
    return {
      sessList: [],
      data: false,
    };
},
    methods:{
        fetchItems: function(){   
        database.collection('modules').get().then((querySnapShot) =>{
            //loop 
            console.log(this.mod)
            let item = {} 
            querySnapShot.forEach(doc=>{
              if (doc.data().module_id == this.mod){
                item = doc.data().sessions
                for (let i=0; i < item.length; i++)          
                    this.sessList.push(item[i])}
            });
    })
    },
    handleClick(sess) {
      console.log(sess)
      //get students'QUESTIONS from database
      database.collection('questions').get().then((querySnapShot) =>{
        //loop
        let item = {}   
        querySnapShot.forEach(doc=>{
          item=doc.data()
          if (item.session_id == sess) {
            this.$router.push({name: "sessionpage", params: {id: sess}});
          }
        })
      })
      this.$router.push({name: "not found"})
    },
    },
     created() {
         this.fetchItems()
  }
    
}
</script>

<style lang="scss" scoped>

#style {
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
  min-height: 100vh;
  align-items: center;
}

</style>
