import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import notpage from '@/views/404'
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
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const StaticRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
}, {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页',
      icon: 'dashboard',
      affix: true
    }
  }]
},
  {
    path: '/basic',
    component: Layout,
    name: 'Basic',
    meta: {
      title: '基础资料',
      icon: 'component'
    },
    children: [{
        path: 'studios',
        component: () => import('@/views/basic/studios/index'),
        name: 'Studios',
        meta: {
          title: '影城信息'
        },
      },{
        path: 'shadow',
        component: () => import('@/views/basic/shadow/index'),
        name: 'Shadow',
        meta: {
          title: '影讯信息'
        },
      },
      {
        path: 'clerk',
        component: () => import('@/views/basic/clerk/index'),
        name: 'Clerk',
        meta: {
          title: '职员管理'
        },
      },
      {
        path: 'user',
        component: () => import('@/views/basic/user/index'),
        name: 'User',
        meta: {
          title: '用户管理'
        },
      }
      ]
    },
    {
      path: '/studios',
      component: Layout,
      name: 'Studios',
      meta: {
        title: '影城配置',
        icon: "component"
      },
      children: [
        {
        path: 'screens',
        component: () => import('@/views/studios/screens/index'),
        name: 'Screens',
        meta: {
          title: '影厅管理'
        },
      },{
        path: 'schedule',
        component: () => import('@/views/studios/schedule/index'),
        name: 'Schedule',
        meta: {
          title: '影厅排片'
        },
      },{
        path: 'booking',
        component: () => import('@/views/studios/booking/index'),
        name: 'Booking',
        meta: {
          title: '人工售票'
        },
      }]
    },
    {
      path: '/warehouse',
      component: Layout,
      name: 'Warehouse',
      meta: {
        title: '商城配置',
        icon: 'component'
      },
      children: [{
        path: 'procurement',
        component: () => import('@/views/warehouse/procurement/index'),
        name: 'Procurement',
        meta: {
          title: '商品规格'
        },
      },{
        path: 'recipients',
        component: () => import('@/views/warehouse/recipients/index'),
        name: 'Recipients',
        meta: {
          title: '商品类型'
        },
      },{
        path: 'movingframe',
        component: () => import('@/views/warehouse/movingframe/index'),
        name: 'Movingframe',
        meta: {
          title: '商品维护'
        },
      },{
        path: 'adjust',
        component: () => import('@/views/warehouse/adjust/index'),
        name: 'Adjust',
        meta: {
          title: '商品回收站'
        },
      }
      ]
    },
    {
      path: '/aftermarket',
      component: Layout,
      name: 'Aftermarket',
      meta: {
        title: '票务管理',
        icon: "component"
      },
      children: [
       {
        path: 'sales',
        component: () => import('@/views/aftermarket/sales/index'),
        name: 'Sales',
        meta: {
          title: '票劵信息'
        },
      }
      ]
    },
    {
      path: '/attendance',
      component: Layout,
      name: 'Attendance',
      meta: {
        title: '推广管理',
        icon: "component"
      },
      children: [{
        path: 'shift',
        component: () => import('@/views/attendance/shift/index'),
        name: 'Shift',
        meta: {
          title: '广告管理'
        },
      },{
        path: 'shift',
        component: () => import('@/views/attendance/shift/index'),
        name: 'Shift',
        meta: {
          title: '优惠券管理'
        },
      }]
    },{
    path: '/attendance',
    component: Layout,
    name: 'Attendance',
    meta: {
      title: '统计报表',
      icon: "component"
    },
    children: [{
      path: 'shift',
      component: () => import('@/views/attendance/shift/index'),
      name: 'Shift',
      meta: {
        title: '影城日销情况表'
      },
    }]
  },
    {
      path: '/system',
      component: Layout,
      name: 'System',
      meta: {
        title: '系统设置',
        icon: "component"
      },
      children: [{
        path: 'users',
        component: () => import('@/views/system/users/index'),
        name: 'Users',
        meta: {
          title: '用户管理'
        },
      },{
        path: 'journal',
        component: () => import('@/views/system/journal/index'),
        name: 'Journal',
        meta: {
          title: '日志管理'
        },
      },{
        path: 'notice',
        component: () => import('@/views/system/notice/index'),
        name: 'Notice',
        meta: {
          title: '通知管理'
        },
      }]
    },
  /* {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '开发文档', icon: 'link', roles: ['admin', 'editor'] } // 设置该路由进入的权限，支持多个权限叠加}
      }
    ]
  }, */

  // 404 page must be placed at the end !!!
  /* {
    path: '*',
    redirect: '/404',
    hidden: true
  } */
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})
