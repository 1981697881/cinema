import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 票务管理-获取列表
export function getTicketList(params, data) {
  const url = '/memberTicket/ticketForm/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
//票劵售卖-获取场次座位信息
export function detailById(params) {
  return request({
    url: '/marshallinDetail/detailById',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}//票劵售卖-生成订单
export function lockSeats(params) {
  return request({
    url: '/engross/lockSeats',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}

