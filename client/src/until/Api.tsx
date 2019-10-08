import Taro from '@tarojs/taro'

// requestType: 1、wx.request  2、callFunction 云函数
const requestType = 1;
const api = {
  host: 'https://merrier.wang',
  path: {
    site: '/api/site.json',
    categories: '/api/categories.json',
    tags: '/api/tags.json',
    posts: '/api/posts',
    search: '/api/content.json'
  },
};

interface ICallback {
  (key?: any): any
}
interface IRequestData {
  url?: string,
  [propName: string]: any
}

type TMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

interface IRequestParams {
  name: string,
  data?: IRequestData,
  method?: TMethod,
  header?: any,
  type?: number,
  success: ICallback,
  error?: ICallback
}


let requestParams: IRequestParams = {
  name: '',
  data: {},
  method: 'GET',
  header: {"Content-Type": "application/json"},
  type: requestType,
  success: ()=>{},
  error: ()=>{},
}

function request(params: IRequestParams) {
  params = {...requestParams, ...params}
  let url
  console.info(params)
  let {success, error, name, data, method, header, type}: IRequestParams = params

  if(!params.type) {
    type = requestType
  }
  if (data && data.url) {
    // 如果传值有请求地址 直接使用
    url = data.url
  }else if (data && data.path) {
    // 如果传值有请求path 则进行拼接
    url = `${api.host}${data.path}`;
    data.url = url
  } else {
    // 如果都没有 就自动拼接请求地址
    url = `${api.host}${api.path[name]}`;
    if (data) {
      data.url = url
    }
  }
  if (type === 1) {
    // 如果请求方式是通过wx.request 则删除请求数据里的url和path属性
    if (data) {
      delete data.url
      delete data.path
    }
    Taro.request({
      url,
      data,
      method,
      header,
    }).then(res => {
      if (res.statusCode == 200) {
        success && success(res.data)
      } else {
        error && error(res)
      }
    }, res=> {
      error && error(res)
    })
  } else {
    console.info(name, data)
    Taro.cloud
      .callFunction({
        name,
        data,
      })
      .then(res => {
        console.info(res)
        if (res.errMsg === "cloud.callFunction:ok") {
          success && success(res.result)
        } else {
          error && error(res)
        }
      })
  }
}

export {api, request};

