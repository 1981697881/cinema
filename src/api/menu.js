import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth' // get token from cookie
export function getRouter(userId) {
  const data = {
    userId: userId
  }
  return request({
    headers: {
      'authorization': getToken('cinerx'),
    },
    url: '/sys-menu/getByUser',
    method: 'get',
  })
}
