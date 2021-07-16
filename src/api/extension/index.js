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
// 优惠券管理-已发布获取列表
export function getCouponIssueLists(params, data) {
  const url = '/couponIssue/couponIssueLists/' + params.pageNum + '/' + params.pageSize
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
// 已发布获取列表-修改
export function bandCouponIssue(params) {
  const url = '/couponIssue/bandCouponIssue'
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
}// 优惠券管理-发布
export function addCouponIssue(params) {
  const url = '/couponIssue/addCouponIssue'
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
}// 团体票管理-新增
export function addShareCdKey(params) {
  return request({
    url: '/memberCdkeyDetail/shareCdKey',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 团体票管理-获取列表
export function getBatchList(params, data) {
  const url = '/memberCdkeyDetail/batchList/' + params.pageNum + '/' + params.pageSize
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
// 团体票管理-兑换码列表
export function qrShareList(params) {
  return request({
    url: '/memberCdkeyDetail/qrShareList',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 团体票管理-生成二维码
export function handShareCdKey(params) {
  return request({
    url: '/memberCdkeyDetail/handShareCdKey',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 团体票管理-二维码列表
export function getShareList(params) {
  return request({
    url: '/memberCdkeyDetail/shareList',
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}

