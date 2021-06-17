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
  /*{
    path: '/workbench',
    component: Layout,
    name: 'Workbench',
    meta: {
      title: '工作台',
      icon: "component"
    },
    children: [
      {
        path: 'booking',
        component: () => import('@/views/workbench/booking/index'),
        name: 'Booking',
        meta: {
          title: '票劵售卖'
        },
      },{
        path: 'saleOfGoods',
        component: () => import('@/views/workbench/saleOfGoods/index'),
        name: 'SaleOfGoods',
        meta: {
          title: '商品售卖'
        },
      },{
        path: 'exchange',
        component: () => import('@/views/workbench/exchange/index'),
        name: 'Exchange',
        meta: {
          title: '票劵兑换'
        },
      }
    ]
  },*/
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
    }, {
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
      },{
        path: 'machine',
        component: () => import('@/views/basic/machine/index'),
        name: 'Machine',
        meta: {
          title: '机台管理'
        },
      },
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
      },
    /*  {
        path: 'schedule',
        component: () => import('@/views/studios/schedule/index'),
        name: 'Schedule',
        meta: {
          title: '影片排期'
        },
      }, */
      {
        path: 'sessions',
        component: () => import('@/views/studios/sessions/index'),
        name: 'Sessions',
        meta: {
          title: '场次管理'
        },
      }]
  },
  {
    path: '/commodity',
    component: Layout,
    name: 'Commodity',
    meta: {
      title: '商品管理',
      icon: 'component'
    },
    children: [{
      path: 'gameCurrency',
      component: () => import('@/views/commodity/gameCurrency/index'),
      name: 'GameCurrency',
      meta: {
        title: '套餐管理'
      },
    }
    /*,{
      path: 'maintain',
      component: () => import('@/views/commodity/maintain/index'),
      name: 'Maintain',
      meta: {
        title: '商品管理'
      },
    }, {
      path: 'specs',
      component: () => import('@/views/commodity/specs/index'),
      name: 'Specs',
      meta: {
        title: '商品规格'
      },
    }, {
      path: 'mold',
      component: () => import('@/views/commodity/mold/index'),
      name: 'Mold',
      meta: {
        title: '商品类型'
      },
    },{
      path: 'settings',
      component: () => import('@/views/commodity/settings/index'),
      name: 'Settings',
      meta: {
        title: '商品设定'
      },
    },  {
      path: 'recycleBin',
      component: () => import('@/views/commodity/recycleBin/index'),
      name: 'RecycleBin',
      meta: {
        title: '商品回收站'
      },
    }*/
    ]
  },
 {
    path: '/ticketing',
    component: Layout,
    name: 'Ticketing',
    meta: {
      title: '票务管理',
      icon: "component"
    },
    children: [
      {
        path: 'tickets',
        component: () => import('@/views/ticketing/tickets/index'),
        name: 'Tickets',
        meta: {
          title: '票劵信息'
        },
      }
    ]
  },
  {
    path: '/extension',
    component: Layout,
    name: 'Extension',
    meta: {
      title: '推广管理',
      icon: "component"
    },
    children: [{
      path: 'advert',
      component: () => import('@/views/extension/advert/index'),
      name: 'Ddvert',
      meta: {
        title: '广告管理'
      },
    }, {
      path: 'coupon',
      component: () => import('@/views/extension/coupon/index'),
      name: 'Coupon',
      meta: {
        title: '优惠券管理'
      },
    }, {
      path: 'groupTicket',
      component: () => import('@/views/extension/groupTicket/index'),
      name: 'GroupTicket',
      meta: {
        title: '团体票管理'
      },
    }]
  },
  {
    path: '/member',
    component: Layout,
    name: 'Member',
    meta: {
      title: '会员管理',
      icon: "component"
    },
    children: [
      {
        path: 'memberInformation',
        component: () => import('@/views/member/memberInformation/index'),
        name: 'MemberInformation',
        meta: {
          title: '会员信息'
        },
      }, /*{
        path: 'integralRule',
        component: () => import('@/views/member/integralRule/index'),
        name: 'IntegralRule',
        meta: {
          title: '积分规则'
        },
      }, {
        path: 'recharge',
        component: () => import('@/views/member/recharge/index'),
        name: 'Recharge',
        meta: {
          title: '充值记录'
        },
      }, {
        path: 'groupExchange',
        component: () => import('@/views/member/groupExchange/index'),
        name: 'GroupExchange',
        meta: {
          title: '兑换记录'
        },
      }, {
        path: 'pointsRecord',
        component: () => import('@/views/member/pointsRecord/index'),
        name: 'PointsRecord',
        meta: {
          title: '积分记录'
        },
      }*/]
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
      path: 'paylog',
      component: () => import('@/views/system/paylog/index'),
      name: 'Paylog',
      meta: {
        title: '交易日志'
      },
    },{
      path: 'wechatLog',
      component: () => import('@/views/system/wechatLog/index'),
      name: 'WechatLog',
      meta: {
        title: '微信支付日志'
      },
    },{
      path: 'about',
      component: () => import('@/views/system/about/index'),
      name: 'About',
      meta: {
        title: '关于我们'
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
