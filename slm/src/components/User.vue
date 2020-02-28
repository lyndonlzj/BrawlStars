<template>
  <div>
      <v-layout row wrap>
          <v-flex xs12 sm12 md12 lg12 v-for="sess in mySessions" v-bind:key="sess.name">
             <v-card class="text-center ma-10">
                 <v-card-text>
                    <div class="subheading">{{sess.name}} </div>
                    <div class="subheading">Mood: {{sess.moodmeter}}</div>
                    <div class="red--text">Date: {{sess.date}}</div>
                 </v-card-text>
            </v-card>   
          </v-flex>
      </v-layout>   
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      mySessions: [
          {name:'bt3103', moodmeter:':)', date:"13/4/20"},
          {name:'cs2030', moodmeter:':)', date:"14/4/20"},
          {name:'mkt1750x', moodmeter:':(', date:"14/4/20"},
      ]
      }
    },
  }
</script>

<style scoped>

</style>