import Article from '../views/article';
import SelfInforduction from '../views/self-introduction';


export default [
  {
    path: '/',
    component: SelfInforduction,
  },
  {
    path: '/article/:title',
    component: Article,
  },
];
