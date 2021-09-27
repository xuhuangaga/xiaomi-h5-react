import { useState, useEffect } from 'react'
import './myorders.scss'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro';
import Header from '../../components/header/Header'
import { getOrders } from '../../store/actions/user'
import { useDispatch, useSelector } from 'react-redux'

const myorders = () => {
  let dispatch = useDispatch()
  let data = useSelector((state: any) => state.user.data)
  let [current, setCurrent] = useState(0)
  let type = Taro.getEnv()
  const tabList = [{ title: '全部订单' }, { title: '待付款' }, { title: '待收货' }]
  useEffect(() => {
    setCurrent(Number(Taro.getCurrentInstance().router?.params.index))
    dispatch(getOrders(Taro.getStorageSync('xm-user')._id))
  }, [])
  const handleClick = (val: number) => {
    setCurrent(val)
  }
  //跳转到详情
  const goto = (item: any) => {
    Taro.navigateTo({ url: `/pages/detail/detail?id=${item.goods._id}` })
  }
  return (
    <div className={'my-orders f-s16 bc-e'}>
      {
        type === 'WEB' ? <Header title={'我的订单'}></Header> : null
      }
      <AtTabs current={current} tabList={tabList} onClick={(val: number) => { handleClick(val) }}>
        <AtTabsPane>
          <div className={'p-10'}>
            {
              data && data.length>0 && data.map((item: any,index:number) => {
                return (
                  <div className={'br-10 bc-w p-10 m-b10'} key={index}>
                    <div className={'f-a-c f-c-9'}>
                      <div>支付时间:{item.pay_time}</div>
                    </div>
                    {
                      item.goods_list && item.goods_list.map((item1: any, index1: number) => {
                        return (
                          <div className={`f-j-b item m-b10 p-b10 m-t10 ${index1 < item.goods_list.length - 1 ? 'b-b' : ''}`} key={index1} >
                            <div onClick={() => { goto(item1) }}>
                              <img src={item1.goods.cover} className={'img'} />
                            </div>
                            <div className={'info'}>
                              <div className={'name sl-one'} onClick={() => { goto(item1) }}>{item1.goods.name}</div>
                              <div className={'f-a-c'}>
                                <div className={'price'}>￥{item1.goods.presentPrice}</div>
                                <div className={'zhx f-c-9 m-l10'}>￥{item1.goods.originalPrice}</div>
                              </div>
                              <div className={'f-a-c f-w'}>
                                {
                                  item1.spec && item1.spec.map((i: any, i1: number) => {
                                    return (
                                      <div key={i1} className={'f-a-c'}>
                                        <div>{i.spec}</div>
                                        {
                                          i1 < item1.spec.length - 1 ? <div>+</div> : null
                                        }
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                            <div>x{item1.count}</div>
                          </div>
                        )
                      })
                    }
                    <div className={'f-j-e'}>
                      <div>
                        <div className={'f-a-c'}>
                          <div>订单总额:</div>
                          <div>￥{item.price}元</div>
                        </div>
                        <div className={'f-a-c m-t5'}>
                          <div>收货地址:</div>
                          <div>{item.address.split(',').join('')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </AtTabsPane>
      </AtTabs>
    </div>
  )
}

export default myorders
