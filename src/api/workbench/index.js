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
    url: '/marshallinDetail/detailByFId',
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
//票劵售卖-查询座位
export function detailSeats(params) {
  return request({
    url: '/engross/detailSeats',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}//票劵售卖-查询座位
export function scheduleSeats(params) {
  return request({
    url: '/scheduleSeat/scheduleSeats',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}//票劵售卖-查询场次
export function querySchedules(params) {
  return request({
    url: '/schedule/schedules',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
//票劵售卖-锁位
export function fhLockSeats(params) {
  return request({
    url: '/FH/lockSeats',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}

