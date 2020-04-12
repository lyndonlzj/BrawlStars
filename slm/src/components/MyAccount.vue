<template>
  <div>
    <Toolbar2></Toolbar2>

    <v-container class="fill-height" fluid>
      <v-card class="mx-auto" max-width="500" outlined color="#f0eddf"> Welcome {{username}}</v-card>
    </v-container>

    <v-container class="fill-height" fluid>
      <v-card class="mx-auto" max-width="500" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Account Information</div>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field id="userin" label="Username"></v-text-field>
                <v-btn
                  id="b"
                  rounded
                  color="#527c70"
                  small
                  @click.prevent="updateName()"
                >Change username</v-btn>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field v-model="email" label="Your Email address"></v-text-field>
                <v-btn rounded color="#527c70" small @click="resetPassword">Change password</v-btn>
              </v-col>
            </v-row>
          </v-list-item-content>

          <v-list-item-avatar tile size="50" color="grey"></v-list-item-avatar>
        </v-list-item>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Toolbar2 from "../layouts/Toolbar2";
import database from "../firebase.js";
import firebase from "firebase";

export default {
  components: {
    Toolbar2,
  },
  data() {
    return {
      email: firebase.auth().currentUser.email,
      userid: firebase.auth().currentUser.uid,
      username:"",
    };
  },

  methods: {
    updateName() {
      var userid = firebase.auth().currentUser.uid;
      var name = document.getElementById("userin").value;
      database
        .collection("users")
        .doc(userid)
        .update({ username: name });
      this.username = name
    },
    resetPassword() {
      const user = firebase.auth().currentUser;
      const auth = firebase.auth();
      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          alert(`Password reset sent to ${user.email}`);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  created() {
    database.collection('users').doc(this.userid).get().then((doc) => {
      this.username = doc.get("username") 
    })
  },

};
</script>

<style lang="scss" scoped>
#input-usage .v-input__prepend-outer,
#input-usage .v-input__append-outer,
#input-usage .v-input__slot,
#input-usage .v-messages {
  border: 1px dashed rgba(0, 0, 0, 0.4);
}
</style>