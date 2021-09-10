import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 影城-获取列表
export function getLocationList(params, data) {
  const url = '/location/locationList/' + params.pageNum + '/' + params.pageSize
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

// 影城-下拉
export function locationFormat() {
  const url = '/location/locationFormat'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
    },
    method: 'POST',
  })
}
// 门店-下拉
export function storesForm() {
  const url = '/store/storesForm'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
    },
    method: 'GET',
  })
}

// 影城-新增
export function addLocation(params) {
  const url = '/location/addLocation'
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

// 影城-删除
export function deleteLocation(params) {
  return request({
    url: '/location/deleteLocation',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}

// 职员管理-获取列表
export function getClerkList(params, query) {
  const url = '/Admin/employee/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 职员管理-新增
export function addClerk(params) {
  return request({
    url: '/employee/add',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 职员管理-修改
export function alterClerk(params) {
  return request({
    url: '/employee/update',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    data: params
  })
}

// 职员管理-获取详情
export function clerkInfo(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('cinerx')
    },
    method: 'get'
  })
}

// 职员管理-获取部门下拉
export function clerkDepartment(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('cinerx')
    },
    method: 'get',
    params
  })
}

// 职员管理-删除
export function delClerk(params) {
  return request({
    url: '/employee/del/' + params,
    headers: {
      'authorization': getToken('cinerx')
    },
    method: 'delete',
  })
}

// 影片-获取列表
export function getMovieList(params, data) {
  const url = '/movie/movieList/' + params.pageNum + '/' + params.pageSize
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

// 影片-新增
export function addMovie(params) {
  const url = '/movie/addMovie'
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

// 影片-删除
export function deleteMovie(params) {
  return request({
    url: '/location/deleteMovie',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 演职人员-添加
export function addStar(params) {
  return request({
    url: '/star/addStar',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 演职人员-删除
export function deleteStar(params) {
  return request({
    url: '/star/deleteStar',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 演职人员-查询
export function getStarList(params) {
  return request({
    url: '/star/starList',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 机台管理-获取列表
export function getPlayList(params, data) {
  const url = '/play/playList/' + params.pageNum + '/' + params.pageSize
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

// 机台管理-新增
export function addPlay(params) {
  const url = '/play/addPlay'
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

// 机台管理-删除
export function deletePlay(params) {
  return request({
    url: '/play/deletePlay',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 门店管理-获取列表
export function getStoresList(params, data) {
  const url = '/store/storesFormByPage/' + params.pageNum + '/' + params.pageSize
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

// 门店管理-新增
export function addStore(params) {
  const url = '/store/addStore'
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

// 门店管理-删除
export function deleteStore(params) {
  return request({
    url: '/store/deleteStore',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
