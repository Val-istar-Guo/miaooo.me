import Root from '../views/root'
import Catalog from '../views/catalog'


export default [
  {
    path: '/',
    component: Root,
    children: [
      {
        path: '',
        component: Catalog,
      },
    ],
  },
]
