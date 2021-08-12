import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 票务管理-获取列表
export function getTicketList(params, data) {
  const url = '/memberTicket/ticketsForm/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}// 商品订单-获取列表
export function getGoodsList(params, data) {
  const url = '/memberGoods/goodsList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}// 充值订单管理-获取列表
export function getRechargeList(params, data) {
  const url = '/memberRecharge/rechargeList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}// 游戏币订单管理-获取列表
export function getCoinList(params, data) {
  const url = '/memberCoin/coinList/' + params.pageNum + '/' + params.pageSize
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
}
//票劵售卖-生成订单
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
//票劵售卖-确认订单
export function confirmOrder(params) {
  return request({
    url: '/FH/confirmOrder',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}

