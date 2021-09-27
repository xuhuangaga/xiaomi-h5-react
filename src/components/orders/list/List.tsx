import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import './index.scss'
import { AtFloatLayout } from 'taro-ui'
import BaceSpace from '../../../static/backspace.png'
import { useReactive } from 'ahooks'
import { useDispatch, useSelector } from 'react-redux'
import { addOrder } from '../../../store/actions/product'

interface Props {
  defaultAddress: any
}

const List = (props: Props) => {
  let dispatch = useDispatch()
  let [money, setMoney] = useState(0)
  //需要结算的商品数据
  let list = Taro.getStorageSync('toBePay')
  let [show, setShow] = useState(false)
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  let data = useReactive({
    psd: ['', '', '', '', '', '']
  })
  //跳转到详情
  const goto = (item: any) => {
    Taro.navigateTo({ url: `/pages/detail/detail?id=${item.goods._id}` })
  }
  useEffect(() => {
    list && list.length > 0 && list.map((item: any) => {
      money += Number(item.goods.presentPrice) * item.count
    })
    setMoney(money)
  }, [])
  //输入密码
  const inputPsd = (item: number) => {
    let flag = false
    let arr = data.psd.filter((i: string) => {
      return !i
    })
    if (arr.length > 0) {
      data.psd.map((i: string, index: number) => {
        if (!i && !flag) {
          data.psd[index] = item + ''
          flag = true
        }
      })
    }

    if (arr.length === 1) {
      if (data.psd.join('') === '123456') {
        //发请求
        dispatch(addOrder({
          user_id: Taro.getStorageSync('xm-user'),
          price: money,
          address: props.defaultAddress.address.split(',').join(''),
          count: list.length,
          pay_time: new Date(),
          goods_list: list,
          mobile: props.defaultAddress.mobile
        }))
      } else {
        Taro.showToast({
          title: '密码输入有误',
          icon: 'none'
        })
      }
    }
  }
  //退格
  const remove = () => {
    let flag = false
    for (let i = data.psd.length - 1; i >= 0; i--) {
      if (data.psd[i] && !flag) {
        data.psd[i] = ''
        flag = true
      }
    }
  }
  return (
    <div className={'orders p-10 f-s16'}>
      <div style={{ paddingBottom: 50 }}>
        {
          list && list.length > 0 && list.map((item: any, index: number) => {
            return (
              <div className={'f-j-b item m-b10 b-b p-b10'} key={index}>
                <div onClick={() => { goto(item) }}>
                  <img src={item.goods.cover} className={'img'} />
                </div>
                <div className={'info'}>
                  <div className={'name sl-one'} onClick={() => { goto(item) }}>{item.goods.name}</div>
                  <div className={'f-a-c'}>
                    <div className={'price'}>￥{item.goods.presentPrice}</div>
                    <div className={'zhx f-c-9 m-l10'}>￥{item.goods.originalPrice}</div>
                  </div>
                  <div className={'f-a-c f-w'}>
                    {
                      item.spec.map((i: any, i1: number) => {
                        return (
                          <div key={i1} className={'f-a-c'}>
                            <div>{i.spec}</div>
                            {
                              i1 < item.spec.length - 1 ? <div>+</div> : null
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                <div>x{item.count}</div>
              </div>
            )
          })
        }
      </div>
      <div className="bottom f-j-e p-f bc-w p-10">
        <div className={'f-a-c'}>
          <div className={'f-a-c'}>
            <div>合计:</div>
            <div className="price">￥{money}元</div>
          </div>
          <div className={'f-c-w t-a-c pay m-l10'} onClick={() => { setShow(true) }}>去结算</div>
        </div>
      </div>
      <AtFloatLayout isOpened={show} onClose={() => { setShow(false) }}
        className={'keyboard'}>
        <div className={'f-j-b f-w'}>
          {
            arr.map((item: number, index: number) => {
              return (
                <div key={index} className={'item t-a-c p-10 m-b5'}
                  onClick={() => { inputPsd(item) }}>{item}</div>
              )
            })
          }
          <div className={'item t-a-c p-10 m-b5'}>
            <img src={BaceSpace} style={{ width: 20, height: 20 }} onClick={remove} />
          </div>
        </div>
      </AtFloatLayout>
      {
        show ? <div className={'psd-box bc-w p-10 f-j-b'}>
          {
            data.psd.map((item: string, index: number) => {
              return (
                <div className={'psd f-j-c'} key={index}>
                  {
                    item ? <div className={'yd'}></div> : null
                  }
                </div>
              )
            })
          }
        </div> : null
      }
    </div>
  )
}

export default List
