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

