import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 入库统计-获取列表
export function getLibraryStatisticsList(data, query) {
  const url = '/putOrder/list/' + data.pageNum + '/' + data.pageSize
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
// 入库统计-获取详情
export function libraryStatisticsInfo(data) {
  const url = '/putOrder/getById/' + data.pageNum + '/' + data.pageSize + '/' + data.id
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'get'
  })
}
// 导出入库统计
export function exportLibraryStatistics(data) {
  const url = '/excel/export/putOrder'
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
// 出库统计-获取列表
export function getOutboundStatisticsList(data, query) {
  const url = '/outOrder/list/' + data.pageNum + '/' + data.pageSize
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
// 出库统计-获取详情
export function outboundStatisticsInfo(data) {
  const url = '/outOrder/getById/' + data.pageNum + '/' + data.pageSize + '/' + data.id
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'get'
  })
}
// 出库统计-获取详情
export function outboundStatisticsInfo2(data) {
  const url = 'outOrder/getByOutNo/' + data.outNo
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'get'
  })
}
// 导出出库统计
export function exportOutboundStatistics(data) {
  const url = '/excel/export/outOrder'
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
// 库存调整-获取列表
export function getAdjustList(data, query) {
  const url = '/adjust/list/' + data.pageNum + '/' + data.pageSize
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
// 导出库存调整
export function exportAdjust(data) {
  const url = '/excel/export/adjust'
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
// 移库-获取列表
export function getMovingframeList(data, query) {
  const url = '/warehouseMove/list/' + data.pageNum + '/' + data.pageSize
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
// 导出移库
export function exportMovingframe(data) {
  const url = '/excel/export/warehouseMove'
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
// 库位看板-获取列表
export function getLocationBoardList(data, query) {
  const url = '/position/board'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'POST',
    data: query
  })
}

// 采购入库计划-获取列表
export function getProcurementList(data, query) {
  const url = '/purchase-order/list/' + data.pageNum + '/' + data.pageSize
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
// 采购入库计划-同步采购入库单
export function syncPOInfoQuery(params) {
  const url = '/Admin/POInfoQuery/sync'
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
// 采购入库计划-导出
export function exportProcurement(data) {
  const url = '/excel/export/purchaseOrder'
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
// 出货计划-获取列表
export function getRecipientsList(data, query) {
  const url = '/ship-order/list/' + data.pageNum + '/' + data.pageSize
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
// 出货计划-出货单
export function syncShipInfo(params) {
  const url = '/Admin/ShipInfo/sync'
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
// 出货计划-导出
export function exportRecipients(data) {
  const url = '/excel/export/shipOrder'
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
// 采购计划-打印
export function procurementBarcode(params) {
  const url = '/barcode/barcodePurchaseOrder'
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
// 采购计划-维护信息
export function procurementUpdate(params) {
  const url = '/purchaseOrderDetail/update'
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
// 盘点信息-获取列表
export function getStorageBinList(data, query) {
  const url = '/position/table/' + data.pageNum + '/' + data.pageSize
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
// 盘点信息-导出
export function exportStorageBin(data) {
  const url = '/excel/export/position'
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
// 出货看板-获取列表
export function getDeliveryOrderBoardList(data, query) {
  const url = '/ship-order/board/' + data.pageNum + '/' + data.pageSize
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
// 采购确认单据
export function notarizeBeputList(params) {
  const url = '/purchase-order/confirm/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
  })
}
// 出货确认单据
export function notarizeOutputList(params) {
  const url = '/ship-order/confirm/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'put'
  })
}
// 批量出货确认
export function notarizeOutputMorn(params) {
  const url = '/ship-order/batchConfirm'
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
// 出货取消确认
export function notarizeCancelOutputList(params) {
  const url = '/ship-order/cConfirm/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'put'
  })
}
// 出库驳回
export function OutBackputList(params) {
  const url = '/outOrder/OutOrderBackInvDetail'
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
// 效率统计
export function logisticsEfficiencyReport(params) {
  const url = '/report-form/logisticsEfficiencyReport'
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
// 员工作业统计
export function employeeJobReport(params) {
  const url = '/report-form/employeeJobReport'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 月度统计统计
export function materialMonthlyReport(params) {
  const url = '/report-form/materialMonthlyReport'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 出库统计看板
export function outBoardReport(params) {
  const url = '/report-form/outBoardReport'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 入库统计看板
export function putBoardReport(params) {
  const url = '/report-form/putBoardReport'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}// 排程明细导出
export function monthlyReport(params) {
  const url = '/excel/export/materialMonthlyReport'
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

