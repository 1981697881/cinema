export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/basic': () => import('@/layout'),
  'studio': () => import('@/views/basic/studio'),
  'shadow': () => import('@/views/basic/shadow'),
  'clerk': () => import('@/views/basic/clerk'),
  'machine': () => import('@/views/basic/machine'),
  'store': () => import('@/views/basic/store'),

  'sessions': () => import('@/views/studios/sessions'),
 /* 'schedule': () => import('@/views/studios/schedule'),*/
  'screens': () => import('@/views/studios/screens'),

  /*'booking': () => import('@/views/workbench/booking'),
  'exchange': () => import('@/views/workbench/exchange'),
  'saleOfGoods': () => import('@/views/workbench/saleOfGoods'),*/

  'maintain': () => import('@/views/commodity/maintain'),
  'gameCurrency': () => import('@/views/commodity/gameCurrency'),
  'mold': () => import('@/views/commodity/mold'),
  'recycleBin': () => import('@/views/commodity/recycleBin'),
  'specs': () => import('@/views/commodity/specs'),
  'settings': () => import('@/views/commodity/settings'),
  'rechargeMeal': () => import('@/views/commodity/rechargeMeal'),

  'tickets': () => import('@/views/ticketing/tickets'),
  'memberCoin': () => import('@/views/order/memberCoin'),
  'memberGoods': () => import('@/views/order/memberGoods'),
  'memberRecharge': () => import('@/views/order/memberRecharge'),

  'advert': () => import('@/views/extension/advert'),
  'coupon': () => import('@/views/extension/coupon'),
  'groupTicket': () => import('@/views/extension/groupTicket'),
  'onCoupon': () => import('@/views/extension/onCoupon'),

  'integralRule': () => import('@/views/member/integralRule'),
  'memberInformation': () => import('@/views/member/memberInformation'),
  'pointsRecord': () => import('@/views/member/pointsRecord'),
  'groupExchange': () => import('@/views/member/groupExchange'),

  'recharge': () => import('@/views/member/recharge'),

  'users': () => import('@/views/system/users'),
  'paylog': () => import('@/views/system/paylog'),
  'wechatLog': () => import('@/views/system/wechatLog'),
  'about': () => import('@/views/system/about'),
  'journal': () => import('@/views/system/journal'),
  'notice': () => import('@/views/system/notice'),
}
