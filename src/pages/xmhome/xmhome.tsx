import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { getStoreHome } from '../../store/actions/home'
import Header from '../../components/header/Header'
import utils from '../../utils/util'
import './xmhome.scss'

const xmhome = () => {
  let dispatch = useDispatch()
  let storeHome = useSelector((state: any) => state.home.storeHome)
  let id: string = ''

  let type = Taro.getEnv()
  useEffect(() => {
    let data = Taro.getStorageSync('home')
    dispatch(getStoreHome({
      area_name: data.name,
      area_id: data.id
    }))
  }, [])
  useEffect(() => {
    if (storeHome && storeHome.length > 0) {
      utils.getLocation(storeHome[0], null, true)
    }
  }, [storeHome])
  return (
    <div className={'xm-home'}>
      {
        type === 'WEB' ? <Header title={'小米之家'}></Header> : null
      }
      <div id="container1" style={{width:375,height:300}}></div>
      <div className={'f-s16 p-10'}>
        {
          storeHome && storeHome.length > 0 && storeHome.map((item: any, index: number) => {
            return (
              <div key={index} className={'m-b10 b-b p-b10'}>
                <div className={'name sl-one'}>{item.store_name}</div>
                <div className={'f-c-9 f-s14'}>
                  {item.shop_time}
                </div>
                <div className={'m-t5'}>
                  {item.address}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default xmhome
