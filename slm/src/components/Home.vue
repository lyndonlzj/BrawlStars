<template>
    <div id="entire">
        <Toolbar1></Toolbar1>
        <div id="desc">
            Dare to ask.
            <br>
            <v-btn rounded color="#527c70" to="/signup">Sign up now</v-btn>
        </div>
    </div>
</template>

<script>
import Toolbar1 from '../layouts/Toolbar1'

export default {
    components:{
        Toolbar1,
    }
}
</script>

<style scoped>

#desc{
    padding: 7cm;
    text-align: center;
    font-family: "Roboto";
    font-weight: 650;
    font-size: 5rem;
}

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