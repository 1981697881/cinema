import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 广告管理-获取列表
export function getPosterList(params, data) {
  const url = '/poster/posterList/' + params.pageNum + '/' + params.pageSize
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

// 广告管理-新增
export function addPoster(params) {
  const url = '/poster/addPoster'
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
// 广告管理-删除
export function deletePoster(params) {
  return request({
    url: '/poster/deletePoster',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 优惠券管理-获取列表
export function getCouponList(params, data) {
  const url = '/coupon/couponList/' + params.pageNum + '/' + params.pageSize
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

// 优惠券管理-新增
export function addCoupon(params) {
  const url = '/coupon/addCoupon'
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
// 优惠券管理-删除
export function deleteCoupon(params) {
  return request({
    url: '/coupon/deleteCoupon',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
