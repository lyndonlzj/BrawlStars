<template>
  <div>
    <h2>Session Name : BT3103</h2>
    <v-btn class="text-right" to="/dashboard" text>Back</v-btn>
    <br><br>
    <h2> Code : H3YGK </h2>
    <h2> Current Mode : "I understand what has been taught so far!" </h2>

    <div id="dashboard">
      <h3 font-weight="bold">All Questions Asked</h3>
      <Questions></Questions>
    </div>
  </div>
</template>

<script>
import Toolbar2 from "../layouts/Toolbar2";
import User from "./User";
import Questions from "./Questions"

export default {
  components: {
    Toolbar2,
    User,
    Questions
  },
  data: () => {
    return {
      showModal: false
    };
  }
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

</style>
