import {Doughnut} from 'vue-chartjs'
import database from "../src/firebase"
import firebase from 'firebase'; 
export default{
    extends:Doughnut,
    data: () => ({
    modulelist: [],
    modules: [],
      questiondict:{},
      username: "",
        datacollection: {
          labels: [],
          datasets: [
            {
              label: 'Sales',
              data: [],
              backgroundColor:['aqua','lightgreen','red','orange'],
              borderWidth:0.5,
              borderColor:"#000"
            },
           /* {
                label: 'Sales2',
                data: [40, 30,10,15],
                backgroundColor:['blue','lightgreen','red','orange']
              }*/
          ]
          
        },
        options: {
            title:{
                display:true,
                text:'Number of Questions You Asked per Module',
                fontColor:'Black',
                fontSize:15

            },
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }

                }]
            },
            layout:{
              padding:{
                  left: 5,
                  right: 0,
                  top: 0,
                  bottom: 10
              }
          }
          
        }
      }),
      methods: {
          fetchData () {
            var userID =  firebase.auth().currentUser.uid;
            database.collection('users').get().then((querySnapShot) =>{
                //loop
                let item = {}    
                querySnapShot.forEach(doc=>{
                  console.log("fetchItems")
                  item=doc.data()
                  if (item.uid == userID) {
                    this.username = item.email
                    this.modules.push(item);
                    for (var x = 0; x < item.enrolled.length; x++) {
                      this.modulelist[x] = item.enrolled[x];
                    }
                    }
                })
                database.collection('questions').get().then((querySnapShot) => {
        
                    querySnapShot.forEach(doc=> {
                      var x = doc.data().session_id.split("-")[0];
                      if(this.modulelist.includes(x)) {
                          console.log(doc.data().user_id)
                          console.log(this.username)
                        if (doc.data().user_id == this.username) {
                            if (!(x in this.questiondict)) {
                                this.questiondict[x] = 1;
                              }
                              else {
                                this.questiondict[x] = this.questiondict[x] + 1;
                              }
                        }
                      }
                    })
                   for (var key in this.questiondict) {
                      this.datacollection.labels.push(key);
                      this.datacollection.datasets[0].data.push(this.questiondict[key]); 
                   }
                   this.renderChart(this.datacollection, this.options)
                   console.log(this.datacollection.labels)
                   console.log(this.datacollection.datasets[0].data)
                  })
              })
          }
      },
    mounted(){
        this.fetchData()
    }
}