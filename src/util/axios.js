import axios from 'axios'

let http = axios.create({
    baseURL:'/api'
})

//拦截器请求拦截
http.interceptors.request.use((req)=>{
    return req
})
//拦截器请求响应
http.interceptors.response.use((res)=>{
    //只返回数据信息
    return res.data
})
//导出封装好的模块
export default http