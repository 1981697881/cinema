import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 生产排程-获取成品列表
export function getSchedulingList(params, query) {
  const url = '/task-scheduling/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 生产排程-获取未排程列表
export function getUnSchedulingList(params, query) {
  const url = '/sale-order/unscheduledList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 生产排程-获取半成品列表
export function getSemiList(params, query) {
  const url = '/task-scheduling/semiList'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 生产排程-预览
export function schedulingPreview(params) {
  const url = '/task-scheduling/getProdRes'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 生产排程-保存
export function schedulingSave(params) {
  const url = '/Admin/Schedule/insertOrder'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 库存生产排程-保存
export function schedulingInventory(params) {
  const url = '/task-scheduling/inventoryScheduling'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 生产排程-修改
export function schedulingAlter(params) {
  const url = '/task-scheduling/update'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data: params
  })
}
// 生产排程-汇报
export function updateProductNum(params) {
  const url = '/task-scheduling/updateProductNum'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data: params
  })
}// 销售计划-修改厂务预计日期
export function updateSaleOrderDetail(params) {
  const url = '/sale-order-detail/update'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data: params
  })
}
// 生产排程-录入批号
export function updateLotNo(params) {
  const url = '/task-scheduling/submitLotNo'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data: params
  })
}
// 生产排程-结束
export function schedulingStop(params, query) {
  const url = '/task-scheduling/stop/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'post',
    data: query
  })
}
// 生产排程-删除
export function schedulingDel(params, query) {
  const url = '/task-scheduling/delete/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'delete',
    data: query
  })
}
// 生产排程-标签打印
export function schedulingPrint(params) {
  const url = '/barcode/barcodeTaskScheduling'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 生产排程-效率表
export function efficiency(params, query) {
  const url = '/report-form/efficiency/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: query
  })
}
// 半成品-导出
export function exportSemiSchedulin(data) {
  const url = '/excel/export/semiTaskScheduling'
  return request({
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    responseType: 'blob',
    url: url,
    method: 'post',
    data: data
  })
}
// 库存排产-获取列表
export function getStorageSchedulingList(data, query) {
  const url = '/inv-detail/lessList/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 库存排产-获取列表
export function getSaleTaskOrderList(data, query) {
  const url = '/TaskSaleOrder/saleTaskOrder/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 生产看板
export function productBoard(params) {
  const url = '/infoBoard/productLine/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'get'
  })
}// 排程明细导出
export function exportTaskSaleOrder(params) {
  const url = '/excel/export/taskSaleOrder'
  return request({
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    responseType: 'blob',
    url: url,
    method: 'post',
    data: params
  })
}
// 工时比例统计表
export function ratioOfWorkingHours(params) {
  const url = '/report-form/ratioOfWorkingHours'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 色系
export function colorStoreParticleSize(params, type) {
  const url = '/report-form/colorClass/' + type
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 订单按时交付率统计表
export function orderDeliveryRate(params) {
  const url = '/report-form/orderDeliveryRate'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 挪单
export function moveBill(params) {
  const url = '/scheduling-extend/moveBill'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 拆单
export function separateBill(params) {
  const url = '/scheduling-extend/separateBill'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 拼单
export function shareBill(params) {
  const url = '/scheduling-extend/shareBill'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 判断超产
export function isOutbreed(params) {
  const url = '/scheduling-extend/isOutbreed'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}

