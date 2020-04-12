<template>
  <v-app id="a">
    <ToolbarEmptyLogo></ToolbarEmptyLogo>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#527c70" dark flat>
                <v-toolbar-title class="change-font" >Create a Session</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  
                  <v-text-field
                    id="Session_Name"
                    label="Module Code (Eg. BT3103)"
                    name="Session Name"
                    type= "text"
                    prepend-icon="mdi-account-circle"
                  />
                  
                  
                  <v-text-field
                    id="Session_Code"
                    label="Week No. (Eg. 1)"
                    name="Session Code"
                    type="number"
                    prepend-icon="mdi-lock"
                  />

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="#d97f76" @click.stop="createNewSession()">Create Session</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ToolbarEmptyLogo from '../layouts/ToolbarEmptyLogo';
import database from "../firebase.js";
import firebase from "firebase";

  export default {
    components: {
      ToolbarEmptyLogo,
    },
    data() {
      return {
        name:null,
        email:null,
        password:null,
      }
    },

    methods:{
      createNewSession: function(){
        var userID = firebase.auth().currentUser.uid;
        var modID = document.getElementById("Session_Name").value.toUpperCase();
        var sessID = document.getElementById("Session_Code").value;
        var modExists = false;
        var name = modID + "-w"+ sessID;
        console.log("name: " + name);

        if(modID === "" || sessID === "" || Number.isInteger(sessID) ){
          alert("Inputs are not formatted properly");
          return;
        }

        //check if exists
        
        database.collection('modules').get().then((querySnapShot) => {
          let item = {};
          //loop to check
          var snapshot = []
          // snapshot = querySnapShot.docs;
          // for(var k = 0; k <snapshot.length; k++){
          //   item = querySnapShot.docs[k].data();
          //   console.log(item.module_id);
          // }
          // console.log("print loop end");

          for(var j = 0; j <snapshot.length; j++){
            const doc = querySnapShot.docs[j];
            item = doc.data();
            console.log(item.module_id);
            //module exists - need to check if can add into sessions array
            if(item.module_id === modID){
              console.log("module id is found: " + item.module_id);

              modExists = true;
              var sessExists = false;
              
              //need check if session exists first
              let lst = [];
              lst =item.sessions;
              var i;
              for(i=0; i < lst.length; i++){
                if(lst[i] === name){
                  sessExists = true;
                  console.log("session also exists within the module: "+ lst[i]);
                  break;
                }
              }

              //if sessExists
              if(sessExists){
                alert("This specific week's session has already been created");
                return;
              } else{
                console.log("check name: " + name);
                console.log("check array1: " + lst.toString());
                lst.push(name);
                console.log("check array2: " + lst.toString());
                //updated the document's session
                if(item.owner == userID){
                  database.collection('modules').doc(item.doc_id).update({ sessions: lst});
                  alert("Module already created, new session added!");
                } else {
                  alert("Module has been created and you are not the owner. Unable to process change.")
                  return;
                }
                
              }

              //donezo, can break.
              break;
            }
          }
          });

        
        
        if(modExists){
          //exist and handled already
          //transfer to next page.
          this.$router.push({name: "sessionpage", params: {id: name}});
          
          return;
        } else{
          //does not exist. can create 
          console.log("creating document now!");
          var sessionlist = [name];
          const ref = database.collection("modules").doc();
          ref.set({
            doc_id : ref.id,
            module_id : modID,
            sessions : sessionlist,
            owner : userID            
          })
          alert("New module with session has been created");
          console.log("created new and end");
          this.$router.push({name: "sessionpage", params: {id: name}});
          console.log("it should end now");
          event.stopPropagation();
          return true;
        }
      }
    }
  }
</script>

<style scoped>
#a{
  background-color: #f0eddf;
}

.change-font {
    font-family: "Roboto", Helvetica, sans-serif;
    font-weight: bold;
}
</style>