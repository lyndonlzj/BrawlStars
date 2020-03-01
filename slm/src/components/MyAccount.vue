<template>
<div>
<Toolbar2></Toolbar2>
  <v-container class="fill-height" fluid>
  <v-card
    class="mx-auto"
    max-width="500"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Account Information</div>
        <v-row>
          <v-col cols="12" sm="6">
          <v-text-field
            v-model="first"
            label="First Name"
          ></v-text-field>
        </v-col>

          <v-col cols="12" sm="6">
          <v-text-field
            v-model="last"
            label="Last Name"
          ></v-text-field>
        </v-col>

          <v-col cols="12" sm="6">
          <v-text-field
            v-model="user"
            label="Username"
          ></v-text-field>
        </v-col>
        

          <v-col cols="12" sm="6">
          <v-text-field
            v-model="password"
            label="Password"
          ></v-text-field>
        </v-col>

          <v-col cols="12" sm="6">
          <v-text-field
            v-model="email"
            label="Email address"
          ></v-text-field>
        </v-col>

        </v-row>

      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="50"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn id="b" rounded color="#527c70" small>Save changes</v-btn>
    </v-card-actions>
  </v-card>
  </v-container>
  </div>
</template>

<script>
import Toolbar2 from "../layouts/Toolbar2";
  export default {
    components: {
      Toolbar2
    },
    data: () => ({
      first: 'John',
      last: 'Doe',
      user: 'johnnydoe',
      password: '********',
      email: 'john_doe@gmail.com'
    }),
  
};
</script>

<style lang="scss" scoped>

  #input-usage .v-input__prepend-outer,
  #input-usage .v-input__append-outer,
  #input-usage .v-input__slot,
  #input-usage .v-messages {
    border: 1px dashed rgba(0,0,0, .4);
  }


</style>