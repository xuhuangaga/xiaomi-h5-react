import { useState, useEffect } from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { useDispatch, useSelector } from 'react-redux'
import { getRecommend } from '../../../store/actions/product'
import { Swiper, SwiperItem } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'

const Recomment = () => {
  let dispatch = useDispatch()
  let recommend = useSelector((state: any) => state.product.recommend)
  let [arr, setArr] = useState<any>([])
  const tabList = [{ title: '为你推荐' }, { title: '爆款推荐' }]
  let [current, setCurrent] = useState(0)
  const handleClick = (index: number) => {
    setCurrent(index)
  }
  useEffect(() => {
    dispatch(getRecommend())
  }, [])
  useEffect(() => {
    if (recommend && recommend.length > 0) {
      let temp:any=[]
      for (let i = 0; i < recommend.length; i += 6) {
        temp.push(recommend.slice(i, i + 6))
      }
      arr=temp
      // console.log(arr);
      
      setArr(arr)
    }
  }, [recommend])
  //跳转到详情
  const goto=(item:any)=>{
    Taro.navigateTo({url:`/pages/detail/detail?id=${item._id}`})
  }
  return (
    <div className={'recommend'}>
      <AtTabs current={current} tabList={tabList} onClick={(index: number) => handleClick(index)}>
        <AtTabsPane current={current} index={0}>
          <Swiper autoplay indicatorDots className={'swipter'}>
            {
              arr && arr.length > 0 && arr.slice(0, 2).map((i: any, i1: number) => {
                return (
                  <SwiperItem key={i1}>
                    <div className={'f-j-b f-w m-t10'}>
                      {
                        i.map((item: any, index: number) => {
                          return (
                            <div className={'item f-s16 hbfb m-b10'} key={index} onClick={()=>{goto(item)}}>
                              <div className={'f-j-c'}>
                                <img src={item.cover} className={'img'} />
                              </div>
                              <div className={'name sl-one t-a-c'}>{item.name}</div>
                              <div className={'f-j-c f-s14'}>
                                <div className={'price'}>￥{item.presentPrice}</div>
                                <div className={'zhx m-l10 f-c-9'}>￥{item.originalPrice}</div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </SwiperItem>
                )
              })
            }
          </Swiper>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
        <Swiper autoplay indicatorDots className={'swipter'}>
            {
              arr && arr.length > 0 && arr.slice(2, 4).map((i: any, i1: number) => {
                return (
                  <SwiperItem key={i1}>
                    <div className={'f-j-b f-w m-t10'}>
                      {
                        i.map((item: any, index: number) => {
                          return (
                            <div className={'item f-s16 hbfb m-b10'} key={index} onClick={()=>{goto(item)}}>
                              <div className={'f-j-c'}>
                                <img src={item.cover} className={'img'} />
                              </div>
                              <div className={'name sl-one t-a-c'}>{item.name}</div>
                              <div className={'f-j-c f-s14'}>
                                <div className={'price'}>￥{item.presentPrice}</div>
                                <div className={'zhx m-l10 f-c-9'}>￥{item.originalPrice}</div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </SwiperItem>
                )
              })
            }
          </Swiper>
        </AtTabsPane>
      </AtTabs>
    </div>
  )
}

export default Recomment
