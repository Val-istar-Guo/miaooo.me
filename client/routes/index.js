import Home from '../pages/home';
import Article from '../pages/article';


export default [
  { path: '/', component: Home, alias: ['/home'] },
  { path: '/article/:name', component: Article }
];
