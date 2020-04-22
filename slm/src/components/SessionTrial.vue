<template>
  <v-app>
      <Toolbar2></Toolbar2>
      <H1>Session Code: {{id}}</H1>
      <wordcloud
      :data="defaultWords"
      nameKey="name"
      valueKey="value"
      :color="Accent"
      :showTooltip="true"
      :wordClick="wordClickHandler">
      </wordcloud>
      <div class="content" >
        <form id="questionForm">
          <input id="questionBox" type="text" name="question" placeholder="Ask here" />
          <v-btn
            id="askQuestion"
            @click.prevent="postQuestion()"
            rounded
            color="#d97f76"
          >Ask Question</v-btn>
        </form>
        <v-btn id="orderButton" @click.prevent="orderVotes()">Order by Upvotes</v-btn>

        <v-list v-for="item in itemsList" v-bind:key="item.question_id"> 
          <v-card class="mx-auto" elevation="12" width= "1200px">
            <v-list-item :to="{name:'q&a',params:{qid:item.question_id}}"> <!-- link to Q&A page-->
              <v-list-item-content>
                <v-list-item-title class="headline">{{item.question}}</v-list-item-title>
                <v-list-item-subtitle>by {{item.user_id}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-btn icon @click.prevent="upvoteQ(item)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            {{item.votes}}
            <!-- <v-spacer></v-spacer> -->
          </v-card>
        </v-list>
      </div>
    </v-app>
</template>

<script>
import Toolbar2 from "../layouts/Toolbar2";
import database from "../firebase.js";
import firebase from "firebase";
import wordcloud from 'vue-wordcloud'

export default {
  components: {
    Toolbar2,
    wordcloud
  },
  data: () => {
    return {
      itemsList: [],
      id: "",
      words: [],
      dict: {}
    };
  },
  methods: {
    
    postQuestion: function() {

      var qn = document.getElementById("questionBox").value;
      const ref = database.collection("questions").doc();
      ref.set({
        question_id: ref.id,
        question: qn,
        votes: 0,
        session_id: this.id,
        answer: {},
        user_id: firebase.auth().currentUser.email
      });
    },
    
    
    upvoteQ: function(i) {
      var qid = i.question_id;
      i.votes = i.votes + 1;
      database
        .collection("questions")
        .doc(qid)
        .update({ votes: i.votes });
    },

    orderVotes: function() {
      this.itemsList = [];
      database.collection('questions').orderBy('votes', "desc").get().then(snapshot => {
        let question = {};
        snapshot.docs.forEach(doc => {
            question = doc.data();
            if (question.session_id == this.id) {
              console.log(question.session_id);
              question.show = true;
              this.itemsList.push(question);
            }
        });
    });
    },

  },

  created() {
    this.id = this.$route.params.id;
    database.collection("questions").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type == "added") {
          if (change.doc.data().session_id == this.id) {
            this.itemsList.push({
              ...change.doc.data()
            });
          }
        }
        if (change.type == "modified") {
          var id = change.doc.data().question_id
          if (change.doc.data().session_id == this.id) {
            for (let i=0; i < this.itemsList.length; i++) {
              if(this.itemsList[Object.keys(this.itemsList)[i]].question_id== id) {
                this.itemsList[Object.keys(this.itemsList)[i]].question_id = change.doct.data()
                break;
              }
            }
            this.itemsList.push({
              ...change.doc.data()
            });
          }
        }
      });
    });

    database.collection('questions').get().then((querySnapShot) =>{
            querySnapShot.forEach(doc=>{
                var sid = doc.data().session_id;
                if (this.id == sid) {
                    var qn = doc.data().question.split(" ");
                    console.log(qn)
                    for (var i = 0; i < qn.length; i++) {
                        if (!(qn[i] in this.dict)) {
                            this.dict[qn[i]] = 1;
                        } else {
                            this.dict[qn[i]] = this.dict[qn[i]] + 1;
                        }
                    }
                
            }

      
      })
    });
    console.log(this.dict);

    for (var key in this.dict) {
        var temp = {};
        temp["name"] = key;
        temp["value"] = this.dict[key];
        this.words.push(temp);
        console.log(temp["name"]);
        console.log(temp["value"]);
    }
  }
}





    

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
  padding: 10px;

  transition: all ease 0.2s;

}

form:after {
  content: "";
  clear: both;
  display: block;
  padding: 10px;
}

// #page {
//   background-color: #f0eddf;
// }

</style>
