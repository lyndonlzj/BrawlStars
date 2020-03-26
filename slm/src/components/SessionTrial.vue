<template>
  <div>
    <Toolbar2></Toolbar2>
    <div>
      Session Name : BT3103 Week 4 <br>
      Code : H3YGK <br>
    </div>
    <div id="dashboard">
      <v-btn to ="/askquestion" rounded>I have a question!</v-btn>
      <h3 font-weight="bold" to="/askq">All Questions Asked</h3>
      <Questions></Questions>
    </div>
  </div>
</template>

<script>
import Questions from "./Questions"
import Toolbar2 from "../layouts/Toolbar2"
//import database from "../firebase.js";

export default {
  components: {
    Questions,
    Toolbar2,
  },
  data: () => {
    return {
      showModal: false
    }
  },
  // },
  // created() {
  //   database.collection('lectures').get().then(querySnapShot => {
  //     querySnapShot.forEach(doc => {
  //       const data = {
  //         'mod': doc.data().module,
  //         'date': doc.data().date,
  //         lecture_id: doc.data().lecture_id,
  //         messages: doc.data().messages
  //       };
  //       this.lectures.push(data);
  //     });
  //   });
  // }
};
</script>

<style lang="scss" scoped>

#dashboard {
  position: center;
  padding-top: 2cm;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  overflow-x: hidden;
}

#back{
}

</style>
