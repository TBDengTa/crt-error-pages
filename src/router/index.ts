import { createRouter, createWebHistory } from 'vue-router'
import { isDomainAllowed } from '@/utils/domain'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue'),
    },
    {
      path: '/:code(\\d{3})',
      name: 'http-error',
      component: () => import('@/pages/HttpErrorPage.vue'),
    },
    {
      path: '/custom',
      name: 'custom-error',
      component: () => import('@/pages/CustomErrorPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found-catchall',
      redirect: (to) => ({
        name: 'http-error',
        params: { code: '404' },
        query: { from: to.fullPath },
      }),
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

// 全局守卫：非白名单域名清除自定义参数（只保留 lang）
const CUSTOM_PARAMS = ['type', 'message', 'title', 'code', 'home_url', 'contact_url']

router.beforeEach((to, _from, next) => {
  if (!isDomainAllowed()) {
    const hasCustom = CUSTOM_PARAMS.some(p => to.query[p] !== undefined)
    if (hasCustom) {
      const clean: Record<string, string> = {}
      if (to.query.lang) clean.lang = to.query.lang as string
      if (to.query.from) clean.from = to.query.from as string
      next({ ...to, query: clean })
      return
    }
  }
  next()
})

export default router
