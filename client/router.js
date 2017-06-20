import Vue from 'vue';
import VueRouter from 'vue-router';

import Example from './pages/example';
import Home from './pages/home';
import Article from './pages/article';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home, alias: ['/home'] },
  { path: '/article/:name', component: Article }
];

export default new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes,
});
