import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 票务管理-获取列表
export function getTicketList(params, data) {
  const url = '/memberTicket/ticketForm/' + params.pageNum + '/' + params.pageSize
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
