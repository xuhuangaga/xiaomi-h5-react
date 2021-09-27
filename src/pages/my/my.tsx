import { arr, arr1 } from '../../types'
import Touxiang from '../../static/user/touxiang.png'
import Taro from '@tarojs/taro';
import utils from '../../utils/util'
import './my.scss'

const my = () => {
  let user = Taro.getStorageSync('xm-user')
  const goto = (url: string) => {
    if (url === '/pages/address/address') {
      Taro.setStorageSync('isOrders', 0)
    }
    Taro.navigateTo({ url: url })
  }
  const checkLogin = (url: string) => {
    if (!url) {
      //退出登录
      Taro.removeStorageSync('xm-user')
      Taro.removeStorageSync('token')
      Taro.navigateTo({ url: '/pages/my/my' })
    } else {
      utils.checkLogin({
        key: 'xm-user',
        next: goto,
        item: url
      })
    }
  }
  return (
    <div className={'f-s16 my-dv'}>
      <div className={'bc-e b-b'}>
        <div className={'my-top'}>
          <div className={'p-10 f-a-c'}>
            <div className={'user'}>
              <img src={Touxiang} className={'wbfb hbfb'} />
            </div>
            {
              user ? <div className={'m-l10 f-c-w'}>
                {user.username}
              </div> :
                <div className={'p-10 f-c-w'} onClick={() => { goto('/pages/login/login') }}>
                  登录/注册
                </div>
            }
          </div>
        </div>
        <div className="b-b p-10 f-j-b  bc-w">
          <div className="">
            我的订单
          </div>
          <div onClick={() => { checkLogin('/pages/myorders/myorders?index=0') }}>
            全部订单
          </div>
        </div>
        <div className={'f-j-a p-10  bc-w'}>
          {
            arr.map((item: any, index: number) => {
              return (
                <div onClick={() => { checkLogin(item.url) }} key={index}>
                  <div className={'f-j-c'}>
                    <img src={item.icon} className={'img'} />
                  </div>
                  <div>
                    {item.name}
                  </div>
                </div >
              )
            })
          }
        </div >
      </div>
      {
        arr1.map((item: any) => {
          return (
            item.map((item1: any, index1: number) => {
              return (
                <div key={index1} className={'f-a-c p-10 b-b'}>
                  <div className={'m-t5'}>
                    <img className={'img'} src={item1.icon} />
                  </div>
                  <div onClick={() => { checkLogin(item1.url) }} className={'wbfb m-l10'}>
                    {item1.name}
                  </div>
                </div>
              )
            })
          )
        })
      }
    </div>
  )
}

export default my
