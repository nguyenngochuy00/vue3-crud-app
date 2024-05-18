import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateView.vue'
import EditView from '../views/EditView.vue'
import DetailsView from '../views/DetailsView.vue'
import UserView from '../views/UserView.vue'

const route = [
  {
    path: '/',
    component: UserView,
    children: [
      {
        path: 'home',
        component: HomeView
      },
      {
        path: 'details/:id',
        component: DetailsView
      }
    ]
  },
  {
    path: '/create',
    component: CreateView
  },
  {
    path: '/edit/:id',
    component: EditView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: route
})

export default router
