<template>
  <div>
    <Toolbar2></Toolbar2>
    <h2>Dashboard</h2>
    <div id="dashboard">
      <h3 font-weight="bold">Your past lectures</h3>
      <ul>
        <li v-for="lecture in lectures" v-bind:key="lecture.mod">
          {{lecture.lecture_id}} {{lecture.date}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Toolbar2 from "../layouts/Toolbar2";
import database from "../firebase.js";
//import moment from 'moment';

export default {
  components: {
    Toolbar2
  },
  data: () => {
    return {
      showModal: false,
      lectures: []
    };
  },
  created() {
    database.collection('lectures').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        const data = {
          'lecture_id': doc.data().lecture_id,
          'date': new Date(doc.data().date.seconds * 1000)
        };
        this.lectures.push(data);
      });
    });
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
