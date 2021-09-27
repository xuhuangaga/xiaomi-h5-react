import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { delAddress, getAddress } from '../../store/actions/user'
import Taro from '@tarojs/taro';
import Del from '../../static/del.png'
import Header from '../../components/header/Header'
import './address.scss'

const address = () => {
  let dispatch = useDispatch()
  let address = useSelector((state: any) => state.user.data)
  let user = Taro.getStorageSync('xm-user')
  let type = Taro.getEnv()
  useEffect(() => {
    dispatch(getAddress(user._id))
  }, [])
  //新增或编辑地址
  const goto = () => {
    Taro.navigateTo({ url: `/pages/editaddress/editaddress` })
  }
  //选中地址
  const choice = (item: any) => {
    let temp = Taro.getStorageSync('isOrders')
    if (temp && temp === 1) {
      Taro.setStorageSync('defaultAddress', item)
      Taro.navigateTo({
        url: '/pages/orders/orders'
      })
    }
  }
  //删除收货地址
  const delItem = (id: string, e: any) => {
    e.stopPropagation()
    Taro.showModal({
      title: '提示',
      content: '确定删除该地址?',
      success: (res: any) => {
        if (res.confirm) {
          dispatch(delAddress({
            addressId: id,
            user_id: user._id
          }))
        }
      }
    })
  }
  return (
    <div className={'f-s16 address'}>
      {
        type === 'WEB' ? <Header title={'地址列表'}></Header> : null
      }
      {
        address && address.length > 0 ? <div>
          {
            address && address.length > 0 && address.map((item: any, index: number) => {
              return (
                <div className={'p-10 f-j-b b-b'} key={index} onClick={() => { choice(item) }}>
                  <div>
                    <div className={'f-a-c'}>
                      <div>{item.username}</div>
                      <div className={'m-l10'}>{item.mobile}</div>
                      {
                        item.isDefault ? <div className={'isdefault f-c-w f-s14 m-l10'}>默认</div> : null
                      }
                    </div>
                    <div className={'m-t10'}>{item.address.split(',').join('')}</div>
                  </div>
                  <div onClick={(e: any) => { delItem(item.id, e) }}>
                    <img src={Del} style={{ width: 20, height: 20 }} />
                  </div>
                </div>
              )
            })
          }
        </div> : <div className={'t-a-c p-t20 m-t20'}>暂无收货地址哦~</div>
      }
      <div className={'bottom p-f t-a-c f-c-w p-tb10'} onClick={goto}>新增地址</div>
    </div>
  )
}

export default address
