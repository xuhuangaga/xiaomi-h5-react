
import Taro from '@tarojs/taro'
const initState = {
  data: [],
  send: [],
  isSuccess:false
}

interface Action {
  type: string,
  data: any
}

const userReducers = (state = initState, action: Action) => {

  if (action.type === 'login') {
    Taro.showToast({
      title: action.data.msg,
      icon: 'none'
    })
    if (action.data.code === 200) {
      Taro.setStorageSync('token', action.data.token)
      Taro.setStorageSync('xm-user', action.data.data)
      setTimeout(() => {
        Taro.navigateBack()
      }, 1000);
    }
    return {
      ...state,
      data: action.data
    }
  }
  if (action.type === 'phoneLogin') {
    Taro.showToast({
      title: action.data.msg,
      icon: 'none'
    })
    if (action.data.code === 200) {
      Taro.setStorageSync('token', action.data.token)
      Taro.setStorageSync('xm-user', action.data.data)
      setTimeout(() => {
        Taro.navigateBack()
      }, 1000);
    }
    return {
      ...state,
      data: action.data
    }
  }
  if (action.type === 'register') {
    Taro.showToast({
      title: action.data.msg,
      icon: 'none'
    })
    return {
      ...state,
      isSuccess: action.data.code===200
    }
  }
  if (action.type === 'send') {
    return {
      ...state,
      send: action.data
    }
  }
  if (action.type === 'address') {
    return {
      ...state,
      data: action.data
    }
  }
  if (action.type === 'orders') {
    return {
      ...state,
      data: action.data
    }
  }
  return {
    ...state
  }
}
export default userReducers