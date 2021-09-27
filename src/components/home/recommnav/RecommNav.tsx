import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { ScrollView } from '@tarojs/components'
import './index.scss'
import { getRecommProduct } from '../../../store/actions/home'
import Taro from '@tarojs/taro'

const RecommNav = () => {
  let dispatch = useDispatch()
  let commNav = useSelector((state: any) => state.home.recommNav)
  let product = useSelector((state: any) => state.home.recommProduct)
  let [active, setActive] = useState(0)
  const change = (index: number) => {
    setActive(index)
    dispatch(getRecommProduct(commNav[index]._id))
  }
  useEffect(() => {
    if (commNav && commNav.length) {
      dispatch(getRecommProduct(commNav[active]._id))
    }
  }, [commNav])
  //跳转到详情
  const goto=(item:any)=>{
    Taro.navigateTo({url:`/pages/detail/detail?id=${item._id}`})
  }
  return (
    <div className={'recommnav p-10 m-t10'}>
      <ScrollView scrollX className={'scrollview'}>
        {
          commNav && commNav.map((item: any, index: number) => {
            return (
              <div className={`item p-b10 m-r10 ${index > 0 ? 'm-l10' : ''} ${active === index ? 'active' : ''}`} key={index}
                onClick={() => { change(index) }}>
                <div className={'f-s16 t-a-c name'}>{item.name}</div>
                <div className={'f-s12 f-c-9 t-a-c desc br-20 m-t5'}>{item.desc}</div>
              </div>
            )
          })
        }
      </ScrollView>
      <ScrollView scrollY className={'h-vh'}>
        <div className={'f-j-b f-w recomm-pro m-t10'}>
          {
            product && product.map((item: any, index: number) => {
              return (
                <div className={'item bc-w br-10 m-b10'} key={index} onClick={()=>goto(item)}>
                  <div className='p-20 f-j-c cover-dv br-10'><img src={item.cover} className={'cover'} /></div>
                  <div className={'f-j-c'}>
                    <div className={'name f-s12 f-c-9 sl-one t-a-c'}>{item.name}</div>
                  </div>
                  <div className={'price f-j-c f-s14 m-t-b10'}>
                    <div>￥</div>
                    <div className={'f-w-b'}>{item.presentPrice}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </ScrollView>
    </div>
  )
}

export default RecommNav
