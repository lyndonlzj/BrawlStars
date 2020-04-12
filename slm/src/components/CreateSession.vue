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
                <v-btn color="#d97f76" @click.prevent="createNewSession()">Create Session</v-btn>
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
        modules: {},
        creators: {},
        docID: {},
      }
    },

    methods:{
      createNewSession: function(){
        var userID = firebase.auth().currentUser.uid;
        var modID = document.getElementById("Session_Name").value.toUpperCase();
        var sessID = document.getElementById("Session_Code").value;
        var name = modID + "-w"+ sessID;
        console.log("name: " + name);

        if(modID === "" || sessID === "" || Number.isInteger(sessID) ){
          alert("Inputs are not formatted properly");
          return;
        }

        //check if module exists
        console.log("checking if module exists");
        if(modID in this.modules){
          console.log("module exists");
          var modsessions = this.modules[modID]; //array of sessions
          //check if the sessions exist in the module
          console.log("checking if session exists");
          if(!modsessions.includes(name)){
            console.log("session does not exist");
            //session does not exist
            var creator = this.creators[modID]; //creator's userid
            //if same creator
            console.log("checking if creator is same");
            if(creator === userID){
              console.log("creator is same!");
              //allow update
              var documentid = this.docID[modID]; //document's id
              modsessions.push(name);
              database.collection("modules").doc(documentid).update({ sessions : modsessions});
              console.log("updating session array");
              this.$router.push({name: "sessionpage", params: {id: name}});
              return;
            }else{
              alert("You are not the creator of this module. Unable to process change.");
            }
          }else {
            //module exist and session exist
            alert("This specific session has already been created within this module");
          }
        } else {
          //module does not exist, we can create a new document
          console.log("creating document now!");
          var sessionlist = [name];
          const ref = database.collection("modules").doc();
          ref.set({
            doc_id : ref.id,
            module_id : modID,
            sessions : sessionlist,
            owner : userID 
          });
          alert("New module with session has been created");
          console.log("created new and end");
          this.$router.push({name: "sessionpage", params: {id: name}});
          console.log("it should end now");
          event.stopPropagation();
          return;
        }
      },
    },

    created(){
      database.collection('modules').get().then((querySnapShot) => {
          let item = {};
          //loop retrieve
          querySnapShot.docs.forEach(doc =>{
            item = doc.data();
            var moduleid = item.module_id;
            var arr = item.sessions;
            var owner = item.owner;
            var documentid = item.doc_id;
            this.modules[moduleid] = arr;
            this.creators[moduleid] = owner;
            this.docID[moduleid] = documentid;
          });
    });
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