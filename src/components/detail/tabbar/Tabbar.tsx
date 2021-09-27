import { useState } from 'react'
import './index.scss'
import home from '../../../static/home.png'
import kf from '../../../static/kf.png'
import carts from '../../../static/carts.png'
import Taro from '@tarojs/taro'

interface Props {
  checkLogin: (index: number) => void,
  total:number
}
const Tabbar = (props:Props) => {
  let [arr, setArr] = useState([
    {
      name: '首页',
      icon: home,
      path: '/pages/index/index'
    }, {
      name: '客服',
      icon: kf,
      path: ''
    }, {
      name: '购物车',
      icon: carts,
      path: '/pages/carts/carts'
    }
  ])
  //跳转页面
  const goto=(path:string)=>{
    Taro.switchTab({url:path})
  }
  return (
    <div className={'tabbar f-j-a bc-w p-f f-s16 p-r'}>
      {
        arr.map((item: any, index: number) => {
          return (
            <div key={index} className={'f-1'} onClick={()=>{goto(item.path)}}>
              <div className={'f-j-c'}>
                <img src={item.icon} className={'img'} />
              </div>
              <div className={'t-a-c m-t5'}>{item.name}</div>
            </div>
          )
        })
      }
      <div className={'brage yd f-c-w t-a-c'}>{props.total}</div>
      <div className={'f-2 carts-btn f-c-w t-a-c m-l10'} onClick={()=>{props.checkLogin(0)}}>加入购物车</div>
      <div className={'f-2 pay-btn f-c-w t-a-c'} onClick={()=>{props.checkLogin(1)}}>立即购买</div>
      <div></div>
    </div>
  )
}

export default Tabbar
