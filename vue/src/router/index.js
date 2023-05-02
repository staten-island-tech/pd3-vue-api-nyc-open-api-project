import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/LineChart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/PieChart',
      name: 'PieChart',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PieChart.vue')
    },
    {
      path: '/LineChart',
      name: 'LineChart',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LineChart.vue')
    }
  ]
})

export default router
