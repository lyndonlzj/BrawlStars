<template id = "a">
  <div>
    <v-app-bar color="#527c70">
        <div id="logohere">
            <router-link class="rlink" to="/">LOGO AND GO HOME</router-link>
        </div>
        
      <v-btn class="b1" to="/login">LOG IN</v-btn>
      <v-btn class="b1" to="/signup">SIGN UP</v-btn>

      <v-menu left bottom></v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({

  })
};
</script>

<style scoped>
#logohere{
    margin-right: 25cm; 
}

.rlink {
  color: #000;
  text-decoration: none;
  font-weight: 550;
  font-size: 0.4cm;
  margin: 0.5cm;
}

.b1{
    margin: 0.2cm;
    font-family: "Roboto";
    font-weight: 550;
}
</style>