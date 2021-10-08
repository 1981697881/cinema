import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 影厅管理-获取列表
export function getHallList(params, data) {
  const url = '/locationHall/hallList/' + params.pageNum + '/' + params.pageSize
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

// 影厅管理-新增
export function addHall(params) {
  const url = '/locationHall/addHall'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 影厅管理-维护价格
export function hallImbalance(params) {
  const url = '/locationHall/hallImbalance'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 影厅管理-维护信息
export function updateHall(params) {
  const url = '/locationHall/updateHall'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 影厅管理-下拉
export function hallFormat(params) {
  const url = '/locationHall/hallFormat'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 影片信息-下拉
export function movieFormat(params) {
  const url = '/movie/movieFormat'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 影厅管理-删除
export function deleteHall(params) {
  return request({
    url: '/locationHall/deleteHall',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 影厅排期-获取列表
export function getMarshallinList(params, data) {
  const url = '/marshallin/marshallinList/' + params.pageNum + '/' + params.pageSize
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
// 影厅排期-生成场次
export function createMDetailCal(params) {
  return request({
    url: '/mDetailCal/createMDetailCal',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 影厅排期-删除
export function deleteMarshallin(params) {
  return request({
    url: '/marshallin/deleteMarshallin',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 影厅排期-新增
export function addMarshallin(params) {
  return request({
    url: '/marshallin/addMarshallin',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 场次管理-获取列表
export function getMDetailList(params, data) {
  const url = '/marshallinDetail/mDetailList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}// 场次管理-获取列表
export function getScheduleList(params, data) {
  const url = '/schedule/scheduleList/' + params.pageNum + '/' + params.pageSize
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
// 影厅同步
export function downloadLocation(params, data) {
  const url = '/FH/downloadLocation'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json;charset=UTF8'
    },

    method: 'POST',
    data: data
  })
}// 座位同步
export function downloadHallSeats(params, data) {
  const url = '/FH/downloadHallSeats'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json;charset=UTF8'
    },
    method: 'POST',
    data: data
  })
}// 场次同步
export function downloadSchedules(params, data) {
  const url = '/FH/downloadSchedules/'+params
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json;charset=UTF8'
    },
    method: 'POST',
  })
}
// 座位狀態同步
export function downloadSchedulesSoldSeats(params, data) {
  const url = '/FH/downloadSchedulesSoldSeats'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json;charset=UTF8'
    },
    method: 'POST',
  })
}
// 票务管理-退票
export function refundOrder(params) {
  console.log(params)
  const url = '/FH/refundOrder'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 票务管理-退余额
export function refundRecharge(params) {
  console.log(params)
  const url = 'V8/Recharge'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 场次管理-停播
export function rfundRecharge(params) {
  console.log(params)
  const url = 'V8/Recharge'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

