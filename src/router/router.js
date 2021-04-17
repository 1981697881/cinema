export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  'basic': () => import('@/layout'),
  'studios': () => import('@/views/basic/studios'),
  'shadow': () => import('@/views/basic/shadow'),
  'clerk': () => import('@/views/basic/clerk'),

  'sessions': () => import('@/views/studios/sessions'),
 /* 'schedule': () => import('@/views/studios/schedule'),*/
  'screens': () => import('@/views/studios/screens'),

  'booking': () => import('@/views/workbench/booking'),
  'exchange': () => import('@/views/workbench/exchange'),
  'saleOfGoods': () => import('@/views/workbench/saleOfGoods'),

  'maintain': () => import('@/views/commodity/maintain'),
  'mold': () => import('@/views/commodity/mold'),
  'recycleBin': () => import('@/views/commodity/recycleBin'),
  'specs': () => import('@/views/commodity/specs'),
  'settings': () => import('@/views/commodity/settings'),

  'ticketing': () => import('@/views/ticketing/tickets'),

  'advert': () => import('@/views/extension/advert'),
  'coupon': () => import('@/views/extension/coupon'),

  'integralRule': () => import('@/views/member/integralRule'),
  'memberInformation': () => import('@/views/member/memberInformation'),
  'pointsRecord': () => import('@/views/member/pointsRecord'),
  'groupExchange': () => import('@/views/member/groupExchange'),
  'groupTicket': () => import('@/views/member/groupTicket'),
  'recharge': () => import('@/views/member/recharge'),



  'users': () => import('@/views/system/users'),
  'about': () => import('@/views/system/about'),
  'journal': () => import('@/views/system/journal'),
  'notice': () => import('@/views/system/notice'),
}
