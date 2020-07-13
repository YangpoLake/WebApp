import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/model-map',
    component: () => import('@/views/modelMap/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    redirect: '/model-map'
  },

  {
    path: '/dashboard',
    component: Layout,
    meta: { title: 'menu.dashboard', icon: 'iconfont icon-chart' },
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'menu.home' }
    },{
      path: 'model-map',
      name: 'ModelMap',
      redirect: '/model-map',
      meta: { title: 'menu.model_map' }
    }]
  },
  {
    path: '/app-data',
    component: Layout,
    redirect: '/app-data/banner',
    name: 'AppData',
    meta: { title: 'menu.app_data', icon: 'iconfont icon-abacus' },
    children: [
      {
        path: 'banner',
        name: 'Banner',
        component: () => import('@/views/appData/banner'),
        meta: { title: 'menu.banner' },
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('@/views/appData/activity'),
        meta: { title: 'menu.activity' },
      }
    ]
  },
  {
    path: '/facilitie',
    component: Layout,
    redirect: '/facilitie/camera',
    name: 'Facilitie',
    meta: { title: 'menu.facilitie', icon: 'iconfont icon-weighing-scale2' },
    children: [
      {
        path: 'camera',
        name: 'Camera',
        component: () => import('@/views/facilitie/camera'),
        meta: { title: 'menu.camera' },
      },
      {
        path: 'streetlight',
        name: 'Streetlight',
        component: () => import('@/views/facilitie/streetlight'),
        meta: { title: 'menu.streetlight' },
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/tourist',
    name: 'User',
    meta: { title: 'menu.user', icon: 'iconfont icon-people' },
    children: [
      {
        path: 'tourist',
        name: 'Tourist',
        component: () => import('@/views/user/tourist'),
        meta: { title: 'menu.tourist' },
      },
      {
        path: 'operation',
        name: 'Operation',
        component: () => import('@/views/user/operation'),
        meta: { title: 'menu.operation' },
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/user/admin'),
        meta: { title: 'menu.admin' },
      }
    ]
  },

  
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
