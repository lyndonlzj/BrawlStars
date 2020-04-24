<template>
  <v-app id="a">
    <ToolbarEmptyLogo></ToolbarEmptyLogo>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#527c70" dark flat>
                <v-toolbar-title class="change-font">Enter Session Code to Join</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    id="code"
                    label="code"
                    name="code"
                    type="text"
                    prepend-icon="mdi-lock"
                    v-model="joincode"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn id="joinButton" @click.prevent="joinClick(joincode)">Join Session</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ToolbarEmptyLogo from '../layouts/ToolbarEmptyLogo'
import database from "../firebase.js";
import firebase from "firebase";
  export default {
    components: {
      ToolbarEmptyLogo,
    },
    data() {
      return {
        joincode: "",
        userid: firebase.auth().currentUser.uid,
        sessionlist: [],
        usermodulelist: [],
      }
    },
    methods:{
      joinClick(code) {
        var modulename = code.split("-")[0];
        for (let i =0; i < this.sessionlist.length; i++) {
          if (this.sessionlist[i] === code) {
            console.log("im in");
            if (!this.usermodulelist.includes(modulename)) {
              this.usermodulelist.push(modulename);
              database.collection("users").doc(this.userid).update({enrolled: this.usermodulelist});
            }
            this.$router.push({name:"sessionpage", params: {id: code}});
            return;
          }
        }
        this.$router.push({name: "not found"});
      }
      
    },
    created(){
        database.collection('modules').get().then((querySnapShot) =>{
            //loop 
            let item = {} 
            querySnapShot.forEach(doc=>{
                item = doc.data().sessions;
                for (let i=0; i < item.length; i++){
                  this.sessionlist.push(item[i]);
                }
                
            });
      });

        database.collection('users').doc(this.userid).get().then((doc) =>{
            this.usermodulelist = doc.get("enrolled") 
      });

      }
  }
</script>

<style scoped>
#a {
  background-color: #f0eddf;
}

.change-font {
  font-family: "Roboto", Helvetica, sans-serif;
  font-weight: bold;
}

#rl {
  background-color: #d97f76;
  cursor: pointer;
  color: black;
  font-family: Roboto;
}
</style>