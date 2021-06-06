/**
 * 封装 axios 请求模块
 */

import axios from 'axios'

const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

export const get = (url, config) => request.get(url, config)

export const post = (url, params, config) => request.get(url, params, config)
