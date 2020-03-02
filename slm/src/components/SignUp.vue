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
                    label="Name"
                    name="name"
                    type="text"
                    prepend-icon="mdi-account-circle"
                  />

                  <v-text-field
                    label="Login"
                    name="login"
                    type="text"
                    prepend-icon="mdi-account-circle"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    prepend-icon="mdi-lock"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="#d97f76" to="/dashboard">Sign up</v-btn>
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

export default {
  components: {
    Toolbar1
  },
  data() {
    return {
      name: null,
      email: null,
      password: null
    };
  }
};
</script>

<style scoped>
#a {
  background-color: #f0eddf;
}
</style>