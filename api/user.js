import { request } from '@/plugins/request'

/**
 * 登陆请求
 */

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

/**
 * 登陆请求
 */

export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}
