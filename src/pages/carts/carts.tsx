import { useEffect, useState } from 'react'
import { getCart } from '../../store/actions/product'
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro'
import './carts.scss'
import Carts from '../../components/carts/Carts'
import Header from '../../components/header/Header'

const carts = () => {
  let dispatch = useDispatch()
  let type = Taro.getEnv()
  let carList = useSelector((state: any) => state.product.carList)
  let user = Taro.getStorageSync('xm-user')
  useEffect(() => {
    user && dispatch(getCart(user._id))
  }, [])
  const goto = (url: string) => {
    Taro.navigateTo({ url: url })
  }
  return (
    <div className={'p-10 carts'}>
      {
        type === 'WEB' ? <Header title={'购物车'}></Header>: null
      }

      {
        user ?
          <div>
            {
              carList && carList.length > 0 ?
                <Carts carList={carList}></Carts>
                : <div className={'f-j-c m-t20 p-t20 f-s16 tip-b'} onClick={() => { goto('/pages/index/index') }}>
                  <div>
                    <div className={'t-a-c'}>您的购物车是空的哦~</div>
                    <div className={'tip wbfb f-c-w m-t10 t-a-c'}>去购物</div>
                  </div>
                </div>
            }
          </div>
          : <div className={'f-j-c m-t20 p-t20 f-s16 tip-b'} onClick={() => { goto('/pages/login/login') }}>
            <div>
              <div className={'t-a-c'}>您还没有登录哦~</div>
              <div className={'tip wbfb f-c-w m-t10 t-a-c'}>立即登录</div>
            </div>
          </div>
      }
    </div>
  )
}

export default carts
