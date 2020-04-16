<template>
  <v-app>
    <div>
    
    <!-- toolbar with back button --> 
    <div>
    <v-app-bar color="#fff" height = "100cm">
      <div id="logohere">
        <router-link class="rlink" to="/dashboard">
          <v-img height="1.9cm" width = "5cm" src="https://drive.google.com/uc?export=download&id=16kftyMwd1t1uZprOW7PsGahvTtE-owOr"></v-img>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn class="b1" :to="{name: 'sessionpage', params: {id: this.modID}} " text>Back</v-btn>
    <v-menu left bottom></v-menu>
    </v-app-bar>
    </div>
    <v-card class="mx-auto" elevation="12" width= "1000px">
     <v-card-title> {{question}}</v-card-title>
       <v-divider></v-divider>
     <v-card-text>  {{answer}}</v-card-text>
     
     <form id="questionForm">
          <input id="answerBox" type="text" name="answer" placeholder="Type Your Answer Here" />
        
          <v-btn
            @click.prevent="answerQuestion()"
            rounded
            color="#d97f76" 
          >Answer</v-btn>
        </form>
    </v-card>
    </div>
  </v-app>
</template>

<script>
import database from "../firebase.js";

export default {
  components: {
    
  },
  data: () => {
    return {
      id: "",
      question: "",
      answer: "",
      modID: ""
    };
  },
  methods: {
    
    answerQuestion: function() {
      var ans = document.getElementById("answerBox").value;
      var qid = this.id;
      database
        .collection("questions")
        .doc(qid)
        .update({ answer: ans });
      this.answer = ans;
      this.answerBox = "";

    },


    fetchItems: function() {
      database
        .collection("questions")
        .get()
        .then(querySnapShot => {
          let question = {};
          querySnapShot.forEach(doc => {
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
    this.id = this.$route.params.qid;
    let docref = database.collection("questions").doc(this.id);
    docref.get().then(snapshot => {
        this.question = snapshot.data().question;
        this.answer = snapshot.data().answer;
        this.modID = snapshot.data().session_id;
    
    })
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

.mx-auto {
  margin-top: 100px;
  padding-bottom: 20px;
}

</style>
