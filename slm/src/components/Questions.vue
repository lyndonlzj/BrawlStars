<template>
  <div>
    <ul>
      <li v-for="s in mySessions" v-bind:key="s.name">
        <div id="date">{{s.time}}</div>
        <h4>{{s.name}}</h4>
        <p>Posted by: {{s.user}}</p>
        <v-btn id="b" rounded color="#527c70" small>See more</v-btn>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      mySessions: [
        { name: "What do you mean by XXX", user:"Kevin Lim", moodmeter: ":)", time: "13:46:22" },
        { name: "I do not understand what you said in slide 25", user:"Teo Ming Jing", moodmeter: ":)", time: "13:44:54" },
        { name: "Can you go through part 2.2 again?",user:"Lim Jing Kang", moodmeter: ":(", time: "13:32:33" },
        { name: "I cannot hear you from the back", user:"Michael Loh", moodmeter: ">:(", time: "13:28:12" },
        { name: "Hi Prof, will part 2.0 be examinable?", user: "Darren Lim", moodmeter: ":|", time: "13:20:08" },
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
