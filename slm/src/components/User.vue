<template>
  <div>
    <ul>
      <li v-for="s in mySessions" v-bind:key="s.name">
        <div id="date">{{s.date}}</div>
        <h4>Title: {{s.name}}</h4>
        <p>sample question1 sag argrgrgq gr gerg?</p>
        <hr>
        <p>sample question2 sag argrgrgq gr gerg?</p>
        <hr>
        <p>sample question3 sag argrgrgq gr gerg?</p>
        <v-btn id="b" rounded color="#527c70" to="/signup" small>See more questions</v-btn>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      mySessions: [
        { name: "bt3103", moodmeter: ":)", date: "15/4/20" },
        { name: "cs2030", moodmeter: ":)", date: "14/4/20" },
        { name: "mkt1750x", moodmeter: ":(", date: "14/4/20" },
        { name: "bt3102", moodmeter: ">:(", date: "13/4/20" },
        { name: "cs2030", moodmeter: ":|", date: "12/4/20" },
      ]};
  },
};
</script>

<style scoped>
#date{
  font-size: .9rem;
}

#rm{
  background-color: #d97f76;
  font-size: .9rem;
}

p{
  padding: .1cm;
  font-size: .9rem;
}

h4{
  background-color: #fff;
  color: #000;
}

ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    max-width: 1300px;
}

li{
    padding: 10px;
    border: 4px solid #000;
    margin: 10px;
    width: 400px;
}
</style>
