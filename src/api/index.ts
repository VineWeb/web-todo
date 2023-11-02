/**
 * 后台 API请求方法封装
 */
import Request from './Request'
const mode = import.meta.env.MODE
// mode test为测试环境打包 development为开发环境  production 为生产环境打包
const httpsEnv = [
  { mode: 'development', baseURL: 'http://localhost:3308/todoapi' },
  { mode: 'production', baseURL: 'https://chenjinbo.cn/todoapi' },
  { mode: 'test', baseURL: 'https://chenjinbo.cn/todoapi' },
]
const baseURL = httpsEnv.filter(item => item.mode === mode)[0].baseURL

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
