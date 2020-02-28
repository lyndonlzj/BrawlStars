import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Home from './components/Home.vue'
import NotFound from './components/NotFound.vue'
import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'
import SessionPage from './components/SessionPage.vue'
import About from './components/About.vue'
import MyAccount from './components/MyAccount.vue'
import vuetify from './plugins/vuetify';

Vue.use(VueRouter);
Vue.config.productionTip = false

const routes = [
  {path: '/', component: Home},
  {path: '/dashboard', component: Dashboard},
  {path: '/login', component: Login},
  {path: '/signup', component: SignUp},
  {path: '/sessionpage', component: SessionPage},
  {path: '/about', component: About},
  {path: '/myaccount', component: MyAccount},
  {path: '*', component: NotFound},
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');