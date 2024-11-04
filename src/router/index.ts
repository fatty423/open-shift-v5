import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import GuardsView from '@/views/GuardsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/guards',
      name: 'guards',
      component: GuardsView
    },
    {
      path: '/guards/:id',
      name: 'guard-profile',
      component: () => import('@/views/GuardProfile.vue')
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('@/views/GuardOnboarding.vue')
    },
    {
      path: '/shifts',
      name: 'shifts',
      component: () => import('@/views/ShiftsView.vue')
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('@/views/ReportsView.vue')
    }
  ]
})

export default router