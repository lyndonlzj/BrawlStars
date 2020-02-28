<template id = "a">
  <div>
    <v-app-bar color="#fff" height = "100cm">
      <div id="logohere">
        <router-link class="rlink" to="/dashboard">
          <v-img height="1.9cm" width = "5cm" src="https://drive.google.com/uc?export=download&id=16kftyMwd1t1uZprOW7PsGahvTtE-owOr"></v-img>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <v-btn class="b1" to="/sessionpage" text>Create Session</v-btn>
      <v-btn class="b1" to="/sessionpage" text>Join Session</v-btn>
      |
      <v-btn class="b1" to="/myaccount" text>My Account</v-btn>
      <v-btn class="b1" to="/" text>Logout</v-btn>

      <v-menu left bottom></v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({})
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