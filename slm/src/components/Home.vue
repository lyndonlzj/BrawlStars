<template>
    <div id="entire">
        <div id = "login">
            <router-link class="rlink" to="/signinup">SIGN IN</router-link>
        </div>
        <div id="pic">
            <img src="../../public/assets/logo.jpg" width="900" height="500"/>
        </div>
    </div>
</template>

<script>
export default {
    components:{
    }
}
</script>

<style scoped>

  #pic{
      position:absolute;
        width: 90%;
        padding-top: 4cm;
        padding-left: 4cm;
        position: relative;
        font-size: 4rem;
        font-weight: bold;
  }

  #login{
    position:absolute;
    padding-top: 0.5cm;
    padding-left: 35cm;
    position: relative;
  }

  .rlink{
        color: #000;
        text-decoration: none;
        font-size: .4cm
  }
</style>