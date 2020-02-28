<template>
  <div>
    <Toolbar2></Toolbar2>
    <h2>Dashboard</h2>
    <div id="dashboard">
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h2{
  padding-top: 1cm;
}

.ccolor{
  color: green;
}

#dashboard {
  position: center;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
}

.button {
  border-radius: 20px;
  border: 1px solid #ffffff;
  appearance: none;
  outline: none;
  background: #84b5cb;
  cursor: pointer;

  display: inline-block;
  padding: 10px 40px;
  //background-image: linear-gradient(to right, #84b5cb, #FF5858);

  color: #fff;
  font-size: 1rem;
  font-weight: bold;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;

  &:hover {
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
  }
}

.button2 {
  border-radius: 20px;
  border: 1px solid #ffffff;
  appearance: none;
  outline: none;
  background: #f0b87a;
  cursor: pointer;

  display: inline-block;
  padding: 10px 40px;
  //background-image: linear-gradient(to right, #84b5cb, #FF5858);

  color: #fff;
  font-size: 1rem;
  font-weight: bold;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;

  &:hover {
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
  }
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;

  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 16px;

  padding: 25px;
}

input {
  background-color: #eee;
  border: none;
  padding: 8px 15px;
  margin: 6px 0;
  width: calc(100% - 30px);
  border-radius: 15px;
  border-bottom: 1px solid #ddd;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #fff, 0 1px 0 #fff;
  overflow: hidden;
  &:focus {
    outline: none;
    background-color: #fff;
  }
}

h1 {
  color: #222;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
}

p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
</style>
