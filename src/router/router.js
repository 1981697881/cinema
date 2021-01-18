export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  'basic': () => import('@/layout'),
  'user': () => import('@/views/basic/user'),
  'studios': () => import('@/views/basic/studios'),
  'shadow': () => import('@/views/basic/shadow'),
  'clerk': () => import('@/views/basic/clerk'),

  'booking': () => import('@/views/studios/booking'),
  'schedule': () => import('@/views/studios/schedule'),
  'screens': () => import('@/views/studios/screens'),

  'procurement': () => import('@/views/warehouse/procurement'),
  'recipients': () => import('@/views/warehouse/recipients'),
  'logisticsStatistical': () => import('@/views/warehouse'),
  'logisticsBoard': () => import('@/views/warehouse'),
  'logisticsPlan': () => import('@/views/warehouse'),
  'movingframe': () => import('@/views/warehouse/movingframe'),
  'adjust': () => import('@/views/warehouse/adjust'),

  'sales': () => import('@/views/aftermarket/sales'),

  'shift': () => import('@/views/attendance/shift'),

  'users': () => import('@/views/system/users'),
  'journal': () => import('@/views/system/journal'),
  'notice': () => import('@/views/system/notice'),
}
