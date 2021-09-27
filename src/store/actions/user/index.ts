import api from '../../../http/api'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'

//用户名+密码登录
export const userLogin = ({ username, password }: { username: string, password: string }) => {
  return (dispatch: any) => {
    api.userLogin({ username: username, password: password })
      .then((res: any) => {
        dispatch({
          type: 'login',
          data: res
        })
      })
      .catch((err: any) => {
        console.log(err);
      })
  }
}

//发送验证码
export const senCode = ({ mobile }: { mobile: string }) => {
  return (dispatch: any) => {
    api.getCode({ mobile: mobile })
      .then((res: any) => {
        dispatch({
          type: 'send',
          data: res
        })
      })
      .catch((err: any) => {
        console.log(err);
      })
  }
}

//手机号登录
export const phoneLogin = ({ mobile, code }: { mobile: string, code: string }) => {
  return (dispatch: any) => {
    api.mobileLogin({ mobile: mobile, code: code })
      .then((res: any) => {
        dispatch({
          type: 'phoneLogin',
          data: res
        })
      })
      .catch((err: any) => {
        console.log(err);
      })
  }
}

//注册
export const register = ({ username, password, mobile, code }: { username: string, password: string, mobile: string, code: string }) => {
  return (dispatch: any) => {
    api.register({ username: username, password: password, mobile: mobile, code: code })
      .then((res: any) => {
        dispatch({
          type: 'register',
          data: res
        })
      })
      .catch((err: any) => {
        console.log(err);
      })
  }
}

//获取收货地址
export const getAddress = (user_id: string) => {
  return (dispatch: any) => {
    // 发请求
    api.getAppAddress(user_id).then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'address',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//删除收货地址
export const delAddress = ({
  addressId,
  user_id
}: {
  addressId: string,
  user_id: string
}) => {
  return () => {
    // 发请求
    api.delAddress({
      addressId,
      user_id
    }).then((res: any) => {
      if (res.code === 200) {
        Taro.showToast({
          title: '删除成功',
          icon: 'none'
        })
        setTimeout(() => {
          Taro.navigateTo({
            url: '/pages/address/address'
          })
        }, 1000);
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//新增收货地址
export const addAddress = ({
  user_id,
  username,
  mobile,
  address,
  detailAddress,
  isDefault
}: {
  user_id: string,
  username: string,
  mobile: string,
  address: string,
  detailAddress: string,
  isDefault: boolean
}) => {
  return () => {
    // 发请求
    api.addAddress({
      user_id,
      username,
      mobile,
      address,
      detailAddress,
      isDefault
    }).then((res: any) => {
      if (res.code === 200) {
        Taro.showToast({
          title: '新增成功',
          icon: 'none'
        })
        setTimeout(() => {
          Taro.navigateTo({
            url: '/pages/address/address'
          })
        }, 1000);
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
}



//获取订单
export const getOrders = (user_id: string) => {
  return (dispatch: any) => {
    // 发请求
    api.getAppOrder(user_id).then((res: any) => {
      res.data.map((item:any,index:number)=>{
       item.pay_time=dayjs(item.pay_time).format('YYYY-MM-DD HH:mm:ss')
      })
      // 触发reducer的方法
      dispatch({
        type: 'orders',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}
