import Root from '../views/root'
import Catalog from '../views/catalog'
import Article from '../views/article'
import NotFound from '../views/NotFound'


export default [
  {
    path: '/',
    component: Root,
    children: [
      {
        path: '',
        component: Catalog,
      },
      {
        path: 'article/:title',
        component: Article,
      },
      {
        path: 'no-fount',
        component: NotFound,
      },
    ],
  },
]
