<template>
    <div id="entire">
        <Toolbar1></Toolbar1>
        <div id="pic">
            <img src="../../public/assets/logo.jpg" width="900" height="500"/>
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