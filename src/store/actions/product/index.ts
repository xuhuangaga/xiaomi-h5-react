import api from "../../../http/api"
import Taro from '@tarojs/taro'

//获取分类
export const getCategory = () => {
  return (dispatch: any) => {
    // 发请求
    api.getCategory().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'category',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//获取搜索热词
export const getSearchWords = () => {
  return (dispatch: any) => {
    // 发请求
    api.getSearchWords().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'hot',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//搜索商品
export const getSearch = (query: string, current?: number, pageSize?: number) => {
  return (dispatch: any) => {
    // 发请求
    api.search({
      current: current ? current : 1,
      pageSize: pageSize ? pageSize : 10000,
      query: query ? query : ''
    }).then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'search',
        data: res
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//获取商品详情
export const getDetail = (id: string) => {
  return (dispatch: any) => {
    // 发请求
    api.goodsDetail(id).then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'detail',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//推荐商品
export const getRecommend = () => {
  return (dispatch: any) => {
    // 发请求
    api.getRecommend().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'recommend',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//加入购物车
export const addCart = ({ user_id, count, goods, spec }: { user_id: string, count: number, goods: any, spec: any }) => {
  return (dispatch: any) => {
    // 发请求
    api.addCart({
      user_id: user_id,
      count: count,
      goods: goods,
      spec: spec
    }).then((res: any) => {
      if (res.code === 200) {
        Taro.showToast({
          title: '加入购物车成功',
          icon: 'none'
        })
      }
      // 触发reducer的方法
      dispatch({
        type: 'addCar',
        data: res
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//获取购物车
export const getCart = (user_id: string) => {
  return (dispatch: any) => {
    // 发请求
    api.getCart(user_id).then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'getCar',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

// 修改购物车数量
export const updateCart = ({ id, user_id, count }: { id: string, user_id: string, count: number }) => {
  return () => {
    // 发请求
    api.updateCart({ id: id, user_id: user_id, count: count }).then(() => {
      // 触发reducer的方法
      // dispatch({
      //   type: 'updateCart',
      //   data: res.data
      // })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}
// 删除购物车
export const delCart = ({ id, user_id }: { id: string, user_id: string }) => {
  return () => {
    // 发请求
    api.delCart({ id: id, user_id: user_id }).then(() => {
      // 触发reducer的方法
      // dispatch({
      //   type: 'updateCart',
      //   data: res.data
      // })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

// 添加订单
//加入购物车
export const addOrder = (
  { user_id, price, address, count, pay_time, goods_list, mobile }
    : { user_id: string, price: number, address: string, count: number, pay_time: any, goods_list: any, mobile: string }) => {
  return (dispatch: any) => {
    // 发请求
    api.addOrder({
      user_id: user_id,
      price: price,
      address: address,
      count: count,
      pay_time: pay_time,
      goods_list: goods_list,
      mobile: mobile
    }).then((res: any) => {
      if (res.code === 200) {
        Taro.showToast({
          title: `成功结算${price}元`,
          icon: 'none'
        })
        Taro.removeStorageSync('isCar')
        Taro.removeStorageSync('toBePay')
        Taro.removeStorageSync('isOrders')
        Taro.removeStorageSync('defaultAddress')
        setTimeout(() => {
          Taro.switchTab({ url: '/pages/index/index' })
        }, 1000);
      }
      // 触发reducer的方法
      dispatch({
        type: 'addOrder',
        data: res
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}


