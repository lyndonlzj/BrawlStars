<template>
  <div>
    <h2>Session</h2>
    <Session></Session>
    <router-link to="/dashboard">Return To Dashboard</router-link>
  </div>
</template>

<script>
import Session from './Session'
export default {
  components:{
    Session,
  },

}
</script>