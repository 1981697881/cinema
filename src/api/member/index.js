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
}
