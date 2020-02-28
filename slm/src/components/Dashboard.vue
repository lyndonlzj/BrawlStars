<template>
  <div>
    <Toolbar2></Toolbar2>
    <h2>Dashboard</h2>

    <div id="dashboard">
      <h3 font-weight="bold">Your past lectures</h3>
      <User></User>
    </div>
  </div>
</template>

<script>
import Toolbar2 from "../layouts/Toolbar2";
import User from "./User";

export default {
  components: {
    Toolbar2,
    User
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
