<template>
<div>
<Toolbar2></Toolbar2>
<h3>Account Information</h3>
    <div id = "account">
      
      Username: abcdef <br>
      Email: abc@xyz.com 
      
      <v-btn id="b" rounded color="#527c70" small @click="showModal = true"> Change Password</v-btn>
       
       <transition name="fade" appear></transition>
      <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>

  <transition name="slide" appear>
      <div class="modal" v-if="showModal">
    <h4>Change Password</h4>
    Old Password: <input type="text"/>
    New Password: <input type="text"/>
   <v-btn id="b" rounded color="#527c70" small @click="showModal = false">
    Save
   </v-btn>
   </div>
   </transition>
     
   </div>
  </div>

</template>

<script>
import Toolbar2 from "../layouts/Toolbar2";
  export default {
    components: {
      Toolbar2
    },
    data: () => {
      return {
        showModal: false
      }
    }

};
</script>

<style lang="scss" scoped>

#account {
  
  position: center;
  padding-top: 2cm;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  //width: 100vw;
  overflow-x: hidden;

 
}

.modal-overlay {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: 98;
 background-color: rgba(0, 0, 0, 0.3);
}

.modal {
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 z-index: 99;
 
 width: 200%;
 max-width: 400px;
 background-color: #FFF;
 border-radius: 20px;

}

input {
      background-color: #eee;
      border: none;
      padding: 8px 15px;
      margin: 6px 0;
      width: calc(100% - 30px);
      border-radius: 15px;
      border-bottom: 1px solid #ddd;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4), 
                        0 -1px 1px #fff, 
                        0 1px 0 #fff;
      overflow: hidden;
      &:focus {
        outline: none;
        background-color: #fff;
      }
    }


</style>