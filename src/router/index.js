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
    path: '/project',
    component: Layout,
    redirect: '/project/brands',
    name: 'Project',
    meta: { title: 'menu.project', icon: 'iconfont icon-abacus' },
    children: [
      {
        path: 'brands',
        name: 'Brands',
        component: () => import('@/views/project/brands'),
        meta: { title: 'menu.brands' },
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/project/product'),
        meta: { title: 'menu.product' },
      },
      {
        path: 'pleasureBoats',
        name: 'PleasureBoats',
        component: () => import('@/views/project/pleasureBoats'),
        meta: { title: 'menu.pleasureBoats' },
      },
      {
        path: 'smallTrains',
        name: 'SmallTrains',
        component: () => import('@/views/project/smallTrains'),
        meta: { title: 'menu.smallTrains' },
      },
      {
        path: 'tourCars',
        name: 'TourCars',
        component: () => import('@/views/project/tourCars'),
        meta: { title: 'menu.tourCars' },
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/project/order'),
        meta: { title: 'menu.order' },
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    redirect: '/device/fogriseDevices',
    name: 'Device',
    meta: { title: 'menu.device', icon: 'iconfont icon-weighing-scale2' },
    children: [
      {
        path: 'fogrise-devices',
        name: 'FogriseDevices',
        component: () => import('@/views/device/fogriseDevices'),
        meta: { title: 'menu.fogriseDevices' },
      },
      {
        path: 'light-devices',
        name: 'LightDevices',
        component: () => import('@/views/device/lightDevices'),
        meta: { title: 'menu.lightDevices' },
      },
      {
        path: 'wifi-devices',
        name: 'WifiDevices',
        component: () => import('@/views/device/wifiDevices'),
        meta: { title: 'menu.wifiDevices' },
      },
      {
        path: 'devices-docs',
        name: 'DevicesDocs',
        component: () => import('@/views/device/devicesDocs'),
        meta: { title: 'menu.devicesDocs' },
      },
      {
        path: 'devices-models',
        name: 'DevicesModels',
        component: () => import('@/views/device/devicesModels'),
        meta: { title: 'menu.devicesModels' },
      }
    ]
  },
  {
    path: '/tourist',
    component: Layout,
    redirect: '/tourist/customer',
    name: 'Tourist',
    meta: { title: 'menu.touristManage', icon: 'iconfont icon-people' },
    children: [
      {
        path: 'customer',
        name: 'Customer',
        component: () => import('@/views/tourist/customer'),
        meta: { title: 'menu.tourist' },
      },
      {
        path: 'activity',
        name: 'Activity',
        component: () => import('@/views/tourist/activity'),
        meta: { title: 'menu.activity' },
      },
      {
        path: 'strategy',
        name: 'Strategy',
        component: () => import('@/views/tourist/strategy'),
        meta: { title: 'menu.strategy' },
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/tourist/feedback'),
        meta: { title: 'menu.feedback' },
      },
      {
        path: 'banner',
        name: 'Banner',
        component: () => import('@/views/tourist/banner'),
        meta: { title: 'menu.banner' },
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/user',
    name: 'User',
    meta: { title: 'menu.userManage', icon: 'iconfont icon-people' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/user'),
        meta: { title: 'menu.user' },
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/user/role'),
        meta: { title: 'menu.role' },
      },
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/user/permission'),
        meta: { title: 'menu.permission' },
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
