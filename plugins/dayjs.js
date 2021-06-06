import dayjs from 'dayjs'
import Vue from 'vue'

// {{ 表达式 | 过滤器 }}
Vue.filter('dateFormat', (value, format = 'MMM DD, YYYY') => {
  return dayjs(value).format(format)
})
