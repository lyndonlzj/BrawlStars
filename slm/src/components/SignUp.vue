<template>
  <v-app id="a">
    <Toolbar1></Toolbar1>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#84b5cb" dark flat>
                <v-toolbar-title>Please fill in your details!</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    type="text"
                    prepend-icon="mdi-account-circle"
                    v-model="email"
                  />

                  <v-text-field
                    label="Password"
                    type="password"
                    prepend-icon="mdi-lock"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn v-on:click="register" color="#d97f76">Sign up</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar1 from "../layouts/Toolbar1";
import firebase from 'firebase';

export default {
  components: {
    Toolbar1
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods : {
    register: function(event) {
      //create user in firebase
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(
        user => {
          alert(`Account created for ${user.user.email}`);
      
          const account = {
            uid: user.user.uid,
            email: user.user.email,
          }

          firebase.firestore().collection('users').doc(user.user.uid).set(account);
          this.$router.push('/dashboard');
        
        },
        err => {
          alert(err.message);
        }
      )
      event.preventDefault();
    }
  }
};
</script>

<style scoped>
#a {
  background-color: #f0eddf;
}
</style>