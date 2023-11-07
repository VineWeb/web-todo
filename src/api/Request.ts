/* eslint-disable */
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import router from './../routers/index'
//  数据类型
interface dataType {
  data: any,
  code: Number,
  message: any
}

// 自定义拦截类型
interface customInterceptorType {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig,
  requestInterceptorCatch?: (error: any) => any,
  responseInterceptor?: (res: any) => any,
  responseInterceptorCatch?: (error: any) => any,
}

//定义自己的实例类型
interface customRequest extends AxiosRequestConfig {
  interceptor?: customInterceptorType,
  baseURL: string,
  headers: any
}

class Request {
  protected instance : AxiosInstance
  interceptor?: customInterceptorType
  constructor( config:  customRequest) {
    this.instance = axios.create(config)
    this.interceptor = config?.interceptor

    // 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch,
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptor?.responseInterceptor,
      this.interceptor?.responseInterceptorCatch,
    )
    
    // 添加请求拦截器
    this.instance.interceptors.request.use((config: any) => {
      let {headers = {}, data = {}, params = {}} = config
      config.data = data
      params = {
        ...params,
      }
      config.params = params

      Object.keys(params).forEach(key => params && (typeof params[key] === 'undefined') && delete params[key])
      headers['Access-Control-Allow-Origin'] = '*'
      if(localStorage.getItem("token")){
        const token = localStorage.getItem("token")
        headers['Authorization'] = token
      }
      config.headers = headers
      return config
    }, (error: any) => error)

    // 添加响应拦截器
    this.instance.interceptors.response.use((response: any) => {
      const data: dataType = response.data
      const {code, message} = data
      // 对响应数据做点什么
      if (code === 200) {
        return Promise.resolve<dataType>(response.data) 
      }
      if (code === 405) {
        return Promise.reject({...response.data})
      }
      return Promise.reject({...response.data})
    }, (error: any) => { 
      return Promise.reject({...error, message: '网络出现了异常，稍后再试试'})
    })
  }
  fetch ({ method = 'get', headers = {}, url = '', params = {}, data = {},}) {
    return this.instance({
      method,
      headers,
      url,
      params,
      data,
    })
  }

  get (url ='', params = {}, headers ={}) {
    return this.fetch({
      url,
      params,
      headers,
    })
  }

  post (url ='', data = {}, headers ={}) {
    return this.fetch({
      method: 'POST',
      url,
      data,
      headers,
    })
  }

  upload (url ='', data = {}, headers ={}) {
    return this.fetch({
      method: 'POST',
      url,
      data,
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}


export default Request
