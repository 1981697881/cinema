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
}
