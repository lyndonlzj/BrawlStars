<template id = "a">
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
      <v-btn class="b1" to="/createsession" text>Create Session</v-btn>
      <v-btn class="b1" to="/joincode" text>Join Session</v-btn>
      <v-btn class="b1" to="/myaccount" text>My Account</v-btn>
      <v-btn v-on:click="logout" class="b1" text>Logout</v-btn>

      <v-menu left bottom></v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return{
      isLoggedIn: false,
      currentUser: false,
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/login');
      })
    }
  },
  components: {}
};
</script>

<style scoped>
.rlink {
  color: #000;
  text-decoration: none;
  font-weight: 550;
  font-size: 0.4cm;
  margin: 0.5cm;
}

.b1 {
  font-family: "Roboto";
  font-weight: 550;
}
</style>