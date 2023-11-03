/**
 * 后台 API请求方法封装
 */
import Request from './Request'
const env = import.meta.env
const { VITE_URL: baseURL  } = env
const request = new Request({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
const API = {
  login: (data?: {}) => request.post('/login', data), // 用户登录
  getUsers: (data?: {}) => request.get('/getUsers', data), // 获取用户列表
}

export default API
