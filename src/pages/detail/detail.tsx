import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, addCart, getCart } from '../../store/actions/product'
import Taro from '@tarojs/taro'
import Banner from '../../components/detail/banner/Banner'
import Spec from '../../components/detail/spec/Spec'
import Back from '../../static/back.png'
import Tabbar from '../../components/detail/tabbar/Tabbar'
import Recommend from '../../components/detail/recommend/Recommend'
import Introduce from '../../components/detail/introduce/Introduce'
import './detail.scss'
import utils from '../../utils/util'

const detail = () => {
  let dispatch = useDispatch()
  let detail = useSelector((state: any) => state.product.detail)
  let carList = useSelector((state: any) => state.product.carList)
  let [defaultSpec, setDefaultSpec] = useState<any>()
  let type = Taro.getEnv()
  //购物车数量
  let [total, setTotal] = useState(0)
  //购买数量
  let [count, setCount] = useState(1)
  useEffect(() => {
    let id: string = Taro.getCurrentInstance().router?.params.id!
    dispatch(getDetail(id))
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 10
    })
    let user = Taro.getStorageSync('xm-user')
    user && dispatch(getCart(user._id))
  }, [])
  useEffect(() => {
    //获取默认规格
    if (detail && detail.spec && detail.spec.length > 0) {
      let arr: any = []
      detail.spec.map(i => {
        if (i.checkList && i.checkList.length > 0) {
          arr.push({
            name: i.name,
            spec: i.checkList[0]
          });
        }
      });
      defaultSpec = arr
      setDefaultSpec(arr)

    }
    carList && setTotal(carList.length)
  }, [detail, carList])
  const goBack = () => {
    Taro.navigateBack()
  }
  //修改规格
  const changeSpec = (val: any) => {
    setDefaultSpec(val)
  }
  const changeCount = (val: number) => {
    setCount(val)
  }
  //加入购物车
  const addCarts = () => {
    Taro.setStorageSync('isCar', '1')
    let user = Taro.getStorageSync('xm-user')
    dispatch(addCart({
      count: count,
      goods: detail,
      spec: defaultSpec,
      user_id: user._id
    }))
    setTimeout(() => {
      dispatch(getCart(user._id))
    }, 1000)
  }
  //立即购买
  const buy = () => {
    Taro.setStorageSync('isCar', '1')
    //立即购买
    let arr = [{
      goods: detail,
      spec: defaultSpec,
      count: 1,
      _id: detail._id
    }]
    Taro.setStorageSync('toBePay', arr)
    Taro.setStorageSync('defaultAddress', null)
    Taro.navigateTo({
      url: "/pages/orders/orders"
    })
  }
  //检查是否登录
  // index  0:加入购物车  1:立即购买
  const checkLogin = (index: number) => {
    utils.checkLogin({
      key: 'xm-user',
      next: index === 1 ? buy : addCarts,
      item: null
    })
  }
  return (
    <div className={'detail bc-e'}>
      {
        type === 'WEB' ? <div className={'p-f back yd z f-j-c'} onClick={goBack}>
          <img src={Back} />
        </div> : null
      }
      <Banner detail={detail}></Banner>
      <div className={'p-10 bc-w'}>
        <div className={'f-a-c'}>
          <div className={'price'}>￥{detail.presentPrice}</div>
          <div className={'f-c-9 zhx f-s16 m-l10'}>￥{detail.originalPrice}</div>
        </div>
        <div className={'f-w-b f-s16 m-t5'}>{detail.name}</div>
      </div>
      {/* 规格 */}
      <div className={'m-t10 bc-w p-10'}>
        <Spec checkLogin={checkLogin} detail={detail} defaultSpec={defaultSpec} count={count} changeSpec={changeSpec} changeCount={changeCount}></Spec>
      </div>
      <div className={'p-10 bc-w m-t10'}>
        <Recommend></Recommend>
        <Introduce detail={detail}></Introduce>
      </div>
      {/* 底部 */}
      <Tabbar checkLogin={checkLogin} total={total}></Tabbar>
    </div>
  )
}

export default detail
