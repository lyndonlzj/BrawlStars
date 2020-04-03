<template>
   <div>
    <Toolbar2></Toolbar2>
    Past Sessions of {{this.mod}}
    <ul>
        <li v-for="sess in sessList" v-bind:key="sess">
          {{sess}} 
        </li>
      </ul>
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
    };
},
    methods:{
        fetchItems: function(){   
        database.collection('modules').get().then((querySnapShot) =>{
            //loop 
            let item = {} 
            querySnapShot.forEach(doc=>{
              if (doc.data().module_id == this.mod){
                item = doc.data().sessions
                for (let i=0; i < item.length; i++)          
                    this.sessList.push(item[i])}
            });
    })
    },
    },
     created() {
         this.fetchItems()
  }
    
}
</script>

<style lang="scss" scoped>

</style>
