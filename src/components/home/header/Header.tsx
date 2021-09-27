import React, { useState } from 'react'
import logo from '../../../static/logo.png'
import user from '../../../static/icon-user.png'
import search from '../../../static/sousuo.png'
import './index.scss'
import Taro from '@tarojs/taro'

const Header = () => {
   //跳转到搜索页
   const goSearch=()=>{
    Taro.navigateTo({url:'/pages/search/search'})
  }
  return (
    <div className={'f-j-b header'} onClick={goSearch}>
      <div>
        <img src={logo} className={'logo'} />
      </div>
      <div className={'search bc-w f-2 m-lr10 f-a-c'}>
        <img src={search} className={'sousuo'} />
        <div className={'placehoder m-l5'}>搜索商品名称</div>
      </div>
      <div>
        <img src={user} className={'user'} />
      </div>
    </div>
  )
}

export default Header
