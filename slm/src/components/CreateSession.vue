<template>
  <v-app id="a">
    <ToolbarEmptyLogo></ToolbarEmptyLogo>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#527c70" dark flat>
                <v-toolbar-title class="change-font" >Create a Session</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  
                  <v-text-field
                    id="Session Name"
                    label="Module Code (Eg. BT3103)"
                    name="Session Name"
                    type= "text"
                    prepend-icon="mdi-account-circle"
                  />
                  
                  
                  <v-text-field
                    id="Session Code"
                    label="Week No. (Eg. 1)"
                    name="Session Code"
                    type="number"
                    prepend-icon="mdi-lock"
                  />

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="#d97f76" to="/sessiontrial">Create Session</v-btn>
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
        name:null,
        email:null,
        password:null,
      }
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
</style>