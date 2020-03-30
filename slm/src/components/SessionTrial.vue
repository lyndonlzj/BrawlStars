<template>
  <v-app id="page">
    <div>
      <Toolbar2></Toolbar2>
      <H1>{{id}}</H1>

      <div class="content">
        <form id="question-form">
          <input id="questionBox" type="text" name="question" placeholder="Ask here" />
          <v-btn rounded color="#d97f76">Ask Question</v-btn>
        </form>
        <v-btn id="orderButton" onclick="orderVote()">Order by Upvotes</v-btn>

        <ul id="question-list"></ul>
        <v-list v-for="item in itemsList" v-bind:key="item.question_id">
          <v-card class="mx-auto">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">{{item.question}}</v-list-item-title>
                <v-list-item-subtitle>by {{item.user_id}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>{{item.answer}}</v-card-text>

            <v-btn icon @click.prevent="upvoteQ">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            {{item.votes}}
            <v-spacer></v-spacer>
            <v-btn text color="deep-purple accent-4">Reply</v-btn>
          </v-card>
        </v-list>
      </div>
    </div>
  </v-app>
</template>

<script>
import Toolbar2 from "../layouts/Toolbar2";
import database from "../firebase.js";

export default {
  components: {
    Toolbar2
  },
  data: () => {
    return {
      itemsList: [],
      id: ""
    };
  },
  methods: {
    fetchItems: function() {
      database
        .collection("questions")
        .get()
        .then(querySnapShot => {
          let question = {};
          querySnapShot.forEach(doc => {
            question = doc.data();
            if (question.session_id == this.id) {
              question.show = true;
              this.itemsList.push(question);
            }
          });
        });
    },
    upvoteQ: function(i) {
        database.collection('questions').where('question_id', '==', i.question_id).get().then(
          snapshot => {
            snapshot.docs.forEach(doc => {
              doc.votes += 1;
            }) 
          }
        )
    }
  },
  created() {
    this.fetchItems();
    this.id = this.$route.params.id;
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
</style>
