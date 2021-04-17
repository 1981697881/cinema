import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 会员信息-获取列表
export function getMemberList(params, data) {
  const url = '/member/memberList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}// 会员信息-团体票购买列表
export function getCdKeyList(params, data) {
  const url = '/memberCdkey/cdKeyList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}// 会员信息-充值列表
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
}
