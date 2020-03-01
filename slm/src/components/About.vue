<template>
  <div>
    <Toolbar1></Toolbar1>
    <h1>Support Lecture Machine</h1><br>
    <h4> Dare to ask.</h4><br>
    <v-container> SLM serves as a platform for lecturers and students to communicate.
      <br><br>
      
      <i> Lecturers </i> are able to create a new SLM session for the lecture of the day. SLM streamlines Q&A sessions during lectures,
      allowing students to clarify their doubts in real- time. Barely have enough time to catch a breath during lectures, 
      let alone answering questions? No worries, you can save the questions raised during the session and answer them at your own pace.
      <br><br>

      <i> Students</i> can ask questions and clarify their doubts by submitting their question during the SLM session created by lecturers. 
      
      </v-container>
  </div>
</template>

<script>
import Toolbar1 from "../layouts/Toolbar1";
export default {
  components: {
    Toolbar1,
  }
};
</script>

<style scoped>
h1{
  text-align: center;
}
h2{
  text-align: center;
}

h4{
  text-align: center;
}
</style>