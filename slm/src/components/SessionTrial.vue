<template>
  <div>
    <Toolbar2></Toolbar2>
    <div>
      Session Name : BT3103 <br>
      Code : H3YGK <br>
    </div>
    <div id="dashboard">
      <h3 font-weight="bold">All Questions Asked</h3>
      <Questions></Questions>
    </div>
  </div>
</template>

<script>
import Questions from "./Questions"
import Toolbar2 from "../layouts/Toolbar2"

export default {
  components: {
    Questions,
    Toolbar2,
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

#back{
}

</style>
