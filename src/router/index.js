import {createRouter, createWebHashHistory} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {routes} from './routes'

NProgress.configure({showSpinner: false})

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

/**
 * 路由跳转后的配置
 */
router.afterEach(() => {
  NProgress.done()
})

export default router
