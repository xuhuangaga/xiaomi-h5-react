import { useEffect, useState } from 'react'
import Address from '../../components/orders/address/Address'
import List from '../../components/orders/list/List'
import Taro from '@tarojs/taro';
import { useSelector, useDispatch } from 'react-redux';
import { getAddress } from '../../store/actions/user'
import Header from '../../components/header/Header'

const orders = () => {
  let address = useSelector((state: any) => state.user.data)
  let type = Taro.getEnv()
  const dispatch = useDispatch()
  let user = Taro.getStorageSync('xm-user')
  //默认收货地址
  let [defaultAddress, setDefalutAddress] = useState<any>()
  useEffect(() => {
    //获取默认收货地址
    dispatch(getAddress(user._id))
  }, [])
  useEffect(() => {
    if (Taro.getStorageSync('defaultAddress')) {
      setDefalutAddress(Taro.getStorageSync('defaultAddress'))
    } else {
      if (address && address.length > 0) {
        let arr = address.filter((item: any) => {
          return item.isDefault
        })
        if (arr.length > 0) {
          setDefalutAddress(arr[0])
        }
      }
    }
  }, [address])
  return (
    <div>
      {
        type === 'WEB' ?
          <Header title={'订单结算'}></Header> : null
      }
      {/* 显示默认地址 */}
      <Address defaultAddress={defaultAddress}></Address>
      {/* 显示商品信息 */}
      <List defaultAddress={defaultAddress}></List>
    </div>
  )
}

export default orders
