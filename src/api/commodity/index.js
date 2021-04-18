import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 商品信息-获取列表
export function getGoodsList(params, data) {
  const url = '/commodity/commodityList/' + params.pageNum + '/' + params.pageSize
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
// 商品信息-新增
export function addCommodity(params) {
  const url = '/commodity/addCommodity'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 商品信息-刪除
export function deleteCommodity(params) {
  const url = '/commodity/deleteCommodity'
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
