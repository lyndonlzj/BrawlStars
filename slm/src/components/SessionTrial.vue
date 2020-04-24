<template>
 <div>
  <v-app>
   
      <Toolbar2></Toolbar2>
      <H1 style="background-color:#f0eddf;padding-left:10px"> Session Code: {{id}}</H1>
      <div v-if="displayWordCloud" style="background-color:#f0eddf"> 
      <wordcloud
      :data="words"
      nameKey="name"
      valueKey="value"
      :color="Accent"
      :showTooltip="true"
      :wordClick="wordClickHandler"
      style="background-color:#f0eddf;padding:0;margin:0">
      </wordcloud>
      </div>
      <div class="content" style="background-color:#f0eddf">
        <form id="questionForm">
          <input id="questionBox" type="text" name="question" placeholder="Ask here" />
          <v-btn
            id="askQuestion"
            @click.prevent="postQuestion()"
            rounded
            color="#d97f76"
          >Ask Question</v-btn>
          <v-btn
            id="wordcloud"
            @click.prevent="wordCloud()"
            rounded
            color="#FFE333"
            style="margin-left: 10px"
          >Toggle Word Cloud</v-btn>
        </form>
        <v-btn id="orderButton" @click.prevent="orderVotes()" style="margin-left: 32px">Order by Upvotes</v-btn>

        <v-list id="questionlist" v-for="item in itemsList" v-bind:key="item.question_id"> 
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
    </div>
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
      dict: {},
      displayWordCloud: false
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
      document.getElementById("questionBox").value = "";
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

    wordCloud: function() {
      this.words = [];
      for (var key in this.dict) {
          var temp = {};
          temp["name"] = key;
          temp["value"] = this.dict[key];
          this.words.push(temp);
          console.log(temp["name"]);
          console.log(temp["value"]);
      }
      this.displayWordCloud = !this.displayWordCloud
      console.log(this.words)
    }
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
  background-color: #ffffff;
  border-color: black;
}


// form input:focus {
//   outline: none;
//   padding: 10px;

//   transition: all ease 0.2s;

// }

form:after {
  content: "";
  clear: both;
  display: block;
  padding: 10px;
}

#questionlist {
  background-color: #f0eddf;
}


#page {
  background-color: #f0eddf;
}

template {
  background-color: #f0eddf;
}

</style>
