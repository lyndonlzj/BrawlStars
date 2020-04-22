<template>
  <v-app>
    <div>
      <!-- toolbar with back button -->
      <div>
        <v-app-bar color="#fff" height="100cm">
          <div id="logohere">
            <router-link class="rlink" to="/dashboard">
              <v-img
                height="1.9cm"
                width="5cm"
                src="https://drive.google.com/uc?export=download&id=16kftyMwd1t1uZprOW7PsGahvTtE-owOr"
              ></v-img>
            </router-link>
          </div>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn class="b1" :to="{name: 'sessionpage', params: {id: this.modID}} " text>Back</v-btn>
          <v-menu left bottom></v-menu>
        </v-app-bar>
      </div>
      <v-card class="mx-auto" elevation="12" width="1000px">
        <v-card-title>{{question}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>{{answer}}</v-card-text>

        <form id="questionForm">
          <input id="answerBox" type="text" name="answer" placeholder="Type Your Answer Here" />

          <v-btn @click.prevent="answerQuestion()" rounded color="#9ACD32">Answer</v-btn>
        </form>
      </v-card>

      <!-- attempt at forum style -->
      <v-list id = "cardlist" v-for="(value,key) in ansMap" v-bind:key="key">
        <v-card class="mx-auto" elevation="12" width="1200px" align="left">
          <v-list-item-content>
            <v-list-item-title class="headline">{{value}}</v-list-item-title>
            <v-list-item-subtitle>by {{key}}</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn @click="changeTrue(key)" rounded color="#d97f76">Delete</v-btn>

          <!-- trying out the dialog for delete -->
          <v-row justify="center">
            <v-dialog v-model="displayDialogs[key]" max-width="290">
              <v-card>
                <v-card-title
                  class="error headline"
                  style="font-weight:bold; color:white"
                >Delete answer?</v-card-title>
                <v-card-text>This action is not reversible</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat @click="displayDialogs[key] = false">Cancel</v-btn>
                  <v-btn color="error" flat @click.prevent="deleteAnswer(key,value)">Confirm</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <!-- trying out dialog for delete -->
        </v-card>
      </v-list>
    </div>
  </v-app>
</template>

<script>
import database from "../firebase.js";
import firebase from "firebase";

export default {
  components: {},
  data: () => {
    return {
      id: "",
      question: "",
      modID: "",
      ansMap: null,
      deleteSpecificQuestionVisibility: false,
      displayDialogs: {}
    };
  },
  methods: {
    changeTrue: function(key) {
      this.displayDialogs[key] = true;
      console.log("checking changeTrue");
      console.log(key);
      console.log(this.displayDialogs[key]);
    },
    answerQuestion: function() {
      var ans = document.getElementById("answerBox").value;
      if(ans.length >60){
          alert("Answer is too long (Max. 60 Characters)");
          document.getElementById("answerBox").value = "";
          return;
      }
      var qid = this.id;

      //push the new answer into the map, then update.
      var userEmail = firebase.auth().currentUser.email;

      //will overwrite previous answer if user asnwered a question before (can look into it later)
      this.ansMap[userEmail] = ans;
      database
        .collection("questions")
        .doc(qid)
        .update({ answer: this.ansMap });

      //changing the box back to empty

      document.getElementById("answerBox").value = "";
    },

    deleteAnswer: function(key, val) {
      console.log("DELETINGGGGG key");
      console.log(key);
      console.log("DELETING VLALALALAL");
      console.log(val);
      var userEmail = firebase.auth().currentUser.email;
      if (userEmail != key) {
        alert("Error. Answer was not posted by you");
        this.displayDialogs[key] = false;
        return;
      } else {
        delete this.ansMap[key];
        database
          .collection("questions")
          .doc(this.id)
          .update({ answer: this.ansMap });
        return;
      }
    }
  },

  created() {
    this.id = this.$route.params.qid;
    // let docref = database.collection("questions").doc(this.id);
    // docref.get().then(snapshot => {
    //   this.question = snapshot.data().question;
    //   this.ansMap = snapshot.data().answer;
    //   console.log(this.ansMap);
    //   this.modID = snapshot.data().session_id;
    // });

    database.collection("questions").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type == "modified" || change.type == "added") {
          if (change.doc.data().question_id == this.id) {
            this.question = change.doc.data().question;
            this.ansMap = change.doc.data().answer;
            console.log(this.ansMap);
            this.modID = change.doc.data().session_id;
            for (var key in this.ansMap) {
              this.displayDialogs[key] = false;
              console.log(key);
              console.log(this.displayDialogs[key]);
            }
          }
        }
      });
    });
  }
};
</script>

<style lang="scss" scoped>
form input {
  float: left;
  width: 38%;
  margin: 1;
  border: 10em;
  margin: 0 1%;
  padding: 10px;
  display: block;
  box-sizing: border-box;
  font-size: 18px;
  background-color: #8eb4c5;
  border-color: black;
}

form input:focus {
  outline: none;
  padding-bottom: 8px;
  transition: all ease 0.2s;
}

form:after {
  content: "";
  clear: both;
  display: block;
}

#page {
  background-color: #f0eddf;
}

#cardlist {
  background-color: #f0eddf;
}
.mx-auto {
  margin-top: 10px;
  padding-bottom: 10px;
  
}
</style>
