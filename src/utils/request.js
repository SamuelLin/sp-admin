import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'

const service = axios.create({
  baseURL: '/api',
  timeout: 30 * 1000
})

// Add a request interceptor
service.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // TODO: 401 or 403 error handling
    ElMessage.error(error || 'Oops, this is a error message.')
    return Promise.reject(error)
  }
)

export default service
