<template>
  <v-app id="page">
    <div>
      <Toolbar2></Toolbar2>
      <H1> {{id}} </H1>

      <div class="content">
        <form id="question-form">
          <input type="text" name="question" placeholder="Ask here" />
          <v-btn rounded color="#d97f76">Ask Question</v-btn>
        </form>
        <v-btn id="orderButton" onclick="orderVote()">Order by Upvotes</v-btn>

        <ul id="question-list"></ul>
        <li v-for="item in itemsList" v-bind:key="item.question_id">
          {{item.question}} {{item.votes}} {{item.question_id}}

        </li>
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
      id:"",
    };
  },
  methods: {
    fetchItems: function() {
      database
        .collection('questions')
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
  margin: 0;
  border: 0;
  margin: 0 1%;
  padding: 10px;
  display: block;
  box-sizing: border-box;
  font-size: 18px;
  background-color: #ffffff;
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

#page{
  background-color:#f0eddf;
}
</style>
