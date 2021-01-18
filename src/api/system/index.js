import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 用户权限管理-获取用户组
export function getUsersTree(params) {
  var url = '/Admin/group/list/'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get'
  })
}
// 用户管理-用户组新增
export function groupAdd(params) {
  const url = '/Admin/group/add'
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
// 用户管理-用户组修改
export function groupAlter(params) {
  const url = '/Admin/group/update'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: {
      goods: params
    }
  })
}
// 用户管理-用户组删除
export function delGroup(params) {
  const url = '/Admin/group/delete/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'delete'
  })
}
// 用户权限管理-获取列表
export function getUsersList(data) {
  const url = '/Admin/user/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 用户权限管理-新增
export function addUsers(params) {
  const url = '/Admin/user/add/'
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
// 用户权限管理-修改
export function alterUsers(params) {
  const url = '/Admin/user/update/'
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
// 用户权限管理-删除
export function delUsers(params) {
  const url = '/Admin/user/delete/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 用户权限管理-禁用
export function disableUsers(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}
// 用户权限管理-启用
export function enableUsers(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}
// 用户管理-获取详情信息
export function getUsersInfo(params) {
  const url = '/Admin/user/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 用户权限管理-职员下拉
export function getClerk(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}
// 用户权限管理-获取菜单树
export function getMenuList(params) {
  return request({
    url: '/sys-menu/getSysMenuTree',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
  })
}

// 日志管理-获取列表
export function journalList(data, query) {
  const url = '/operation-log/list/' + data.pageNum + '/' + data.pageSize
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
// 日志管理-清除
export function journalClean(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}

// 看板管理-获取列表
export function getBoardList(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}
// 看板管理-获取详情
export function getBoardInfo(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}
// 看板管理-新增
export function boardAdd(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}
// 看板管理-删除
export function delBoard(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}
// 数据字典-获取列表
export function getDictList(data) {
  const url = '/dict/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 日志管理-添加日志
export function addOperationLog(data) {
  const url = '/operation-log/add'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'get',
    params: data
  })
}

// 数据字典-查找
export function dictGetById(params) {
  return request({
    url: '/dict/getById/' + params,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get'
  })
}// 权限按钮-查找
export function getByUserAndPrId(params) {
  return request({
    url: '/sys-menu/getByUserAndPrId/' + params,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get'
  })
}
// 数据字典-修改
export function alterDict(params) {
  return request({
    url: '/dict/update',
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    data: params
  })
}
// 主界面
export function mainReport(params) {
  return request({
    url: '/report-form/mainReport',
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
