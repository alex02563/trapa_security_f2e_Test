import { createWebHistory, createRouter } from 'vue-router'
//  Layouts
import defaultLayout from '@/layouts/default.vue'

//  Pages
import Info from '@/pages/Info.vue'
import NotFound from '@/pages/NotFound.vue'
const routes = [
  {
    path: '/',
    name: 'Index',
    component: defaultLayout,
    redirect: '/info',
    requireAuth: true,
    children: [
      {
        path: '/info',
        component: Info
      }
    ]
  },
  {
    name: '404',
    path: '/404',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
