<template>
  <v-app id="a">
    <ToolbarEmptyLogo></ToolbarEmptyLogo>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#527c70" dark flat>
                <v-toolbar-title class="change-font">Enter Session Code to Join</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    id="Code"
                    label="Code"
                    name="code"
                    type="text"
                    prepend-icon="mdi-lock"
                    v-model="code"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <router-link id="rl" :to="{name: 'sessionpage', params: {id: this.code}} ">
                  Join Here
                </router-link>

              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    </v-content>
  </v-app>
</template>

<script>
import ToolbarEmptyLogo from '../layouts/ToolbarEmptyLogo'

  export default {
    components: {
      ToolbarEmptyLogo,
    },
    data() {
      return {
        code: "",
      }
    },
    methods:{
    }
  }
</script>

<style scoped>
#a{
  background-color: #f0eddf;
}

.change-font {
    font-family: "Roboto", Helvetica, sans-serif;
    font-weight: bold;
}

#rl{
   background-color: #d97f76;
   cursor: pointer;
   color: black;
   font-family: Roboto;

 }
</style>