
<template>
<v-app>
  <div>
  <h1> Page not found!</h1>
  <v-btn id = "btn" @click.prevent = "dashboard">Back to Dashboard</v-btn>
  <v-btn id ="btn" @click.prevent = "backjoincode">Back to Join Code</v-btn>
  </div>
</v-app>
</template>

<script>
  export default {
    methods:{
      dashboard() {
        this.$router.push({name: "dashboard"});
      },
      backjoincode() {
        this.$router.push({name: "joincode"});
      }
    }
  }
</script>

<style scoped>
#btn {
  display: inline-block;
  width: 20%;
  padding-left: 100px;
  padding-right: 100px;
}

#rl{
   background-color: #d97f76;
   cursor: pointer;
   color: black;
   font-family: Roboto;

 }
 div {
    height: 200px;
    width: 700px;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -350px;
}
</style>