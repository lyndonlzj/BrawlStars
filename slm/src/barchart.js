import { Bar } from 'vue-chartjs'
import database from "../src/firebase"
import firebase from 'firebase'; 
  export default {
    extends: Bar,
    data () {
      return {
          modules: [],
      modulelist: [],
      questiondict:{},
        datacollection: {
        
          labels: [],
          datasets: [
            {
              label: 'Number of Question Asked',
              //backgroundColor: '#f87979',
              backgroundColor: ['accent','red','green','blue'],
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              data: []
            }
          ]
        },
        options: {
            title:{
                display:true,
                text:'Number of Questions Asked per Session',
                fontColor:'Black',
                fontSize:15

            },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    methods: {
        fetchData() {
            var userID =  firebase.auth().currentUser.uid;
     //console.log(userID)
      database.collection('users').get().then((querySnapShot) =>{
        //loop
        let item = {}    
        querySnapShot.forEach(doc=>{
          console.log(userID)
          item=doc.data()
          if (item.uid == userID) {
            this.modulelist = item.enrolled
            }
        })
        database.collection('questions').get().then((querySnapShot) => {
        
        querySnapShot.forEach(doc=> {
          var x = doc.data().session_id;
          if(this.modulelist.includes(x.split("-")[0])) {
            if (!(x in this.questiondict)) {
              this.questiondict[x] = 1;
            }
            else {
              this.questiondict[x] = this.questiondict[x] + 1;
            }
          }
        })
       for (var key in this.questiondict) {
          this.datacollection.labels.push(key);
          this.datacollection.datasets[0].data.push(this.questiondict[key]); 
       }
       this.renderChart(this.datacollection, this.options)
      })
      
      })
        }
    },
    mounted () {
      this.fetchData()
    }
  }