import api from "../../../http/api"

//轮播图
export const getBanner = () => {
  return (dispatch: any) => {
    // 发请求
    api.getBanner().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'banner',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//推荐导航
export const getNav = () => {
  return (dispatch: any) => {
    // 发请求
    api.getNav().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'nav',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//人气上新
export const getNew = () => {
  return (dispatch: any) => {
    // 发请求
    api.getNew().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'new',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//推荐导航
export const getRecommNav = () => {
  return (dispatch: any) => {
    // 发请求
    api.getRecommendNav().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'commNav',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//推荐导航商品
export const getRecommProduct = (id: string) => {
  return (dispatch: any) => {
    // 发请求
    api.getNavGoods({ id: id }).then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'commproduct',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//获取通知
export const getNotice = () => {
  return (dispatch: any) => {
    // 发请求
    api.getNotice().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'notice',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//获取城市列表
export const getAreaList = () => {
  return (dispatch: any) => {
    // 发请求
    api.getAreaList().then((res: any) => {
      // 触发reducer的方法
      res.data.map((item: any) => {
        item.title = item.py_head
        item.key = item.py_head
        let arr: any = []
        item.name_list.map((i: any) => {
          arr.push({
            name: i.name
          })
        })
        item.items = arr
      })
      dispatch({
        type: 'citys',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//搜索城市列表
export const searchAreaList = (content: string) => {
  return (dispatch: any) => {
    // 发请求
    api.searchAreaList(content).then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'searchArea',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}
//获取小米之家
export const getStoreHome = ({ area_name, area_id }: { area_name: string, area_id: string }) => {
  return (dispatch: any) => {
    // 发请求
    api.getStoreHome({ area_name, area_id }).then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'storeHome',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}

//获取店铺详情
export const getStoreDetail = (mihome_id:string) => {
  return (dispatch: any) => {
    // 发请求
    api.getStoreDetail(mihome_id).then((res: any) => {
      
      // 触发reducer的方法
      dispatch({
        type: 'storeDetail',
        data: res.data
      })

    }).catch((err: any) => {
      console.log(err)
    })
  }
}