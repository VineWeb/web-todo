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
  getTodoList: (data?: {}) => request.get('/getTodoList', data), // 获取待办列表
  addTodo: (data?: {}) => request.post('/addTodo', data), // 新增待办
  updateTodo: (data?: {}) => request.post('/updateTodo', data), // 编辑待办
  deleteTodo: (data?: {}) => request.get('/deleteTodo', data), // 删除待办
  getSpark: (data?: {}) => request.get('/getSpark', data), // 获取大模型数据
}

export default API
