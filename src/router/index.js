import { createRouter, createWebHistory } from 'vue-router'
import {firebase} from '../firebase'

const routes = [

  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
  },    
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import(/* webpackChunkName: "perfil" */ '../views/PerfilView.vue'),
    meta:{
      requiresAuth: true
    }
  },  
  {
    path: '/crud',
    name: 'crud',
    component: () => import(/* webpackChunkName: "crud" */ '../views/CrudView.vue'),
    meta:{
      requiresAuth: true
    }  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( async (to, from, next) => {
  const protectedRoute = to.matched.some(record => record.meta.requiresAuth)
  if(protectedRoute && !(await firebase.getCurrentUser())){
    next('/')
  }else{
    next()
  }
})

export default router
