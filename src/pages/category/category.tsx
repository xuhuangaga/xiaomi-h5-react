import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getCategory } from '../../store/actions/product'
import { ScrollView } from '@tarojs/components'
import './category.scss'
import search from '../../static/sousuo.png'
import Taro from '@tarojs/taro'

const category = () => {
  let dispatch = useDispatch()
  // 一级分类
  let category = useSelector((state: any) => state.product.category)
  // 二级分类
  let [secontLevel, setSecondLevel] = useState<any>([])
  // 二级分类下的商品
  let [list, setList] = useState<any>([])
  let [active, setActive] = useState(0)
  let [activeLevel, setActiveLevel] = useState(0)
  let [id, setId] = useState(0)

  useEffect(() => {
    dispatch(getCategory())
  }, [])
  useEffect(() => {
    if (category && category.length) {
      setSecondLevel(category[active].list)
      setList(category[active].list)
    }
  }, [category])
  //切换一级分类
  const change = (index: number) => {
    setActive(index)
    setActiveLevel(0)
    setList(category[index].list)
    setSecondLevel(category[index].list)

  }
  //切换二级分类
  const changeLevel = (index: number, item: any) => {
    setActiveLevel(index)
    setList(category[active].list)
    setId(item._id)
  }
  //跳转到搜索页
  const goSearch = () => {
    Taro.navigateTo({ url: '/pages/search/search' })
  }
  //跳转到详情
  const goto = (item: any) => {
    Taro.navigateTo({ url: `/pages/detail/detail?id=${item._id}` })
  }
  return (
    <div className={'category'}>
      <div className={'bc-w p-f z search'}>
        <div className={'f-a-c p-10 m-10 br-20 box'} onClick={goSearch}>
          <img src={search} className={'sousuo'} />
          <div className={'placehoder m-l5'}>搜索商品名称</div>
        </div>
      </div>
      <div className={'f p-tb10 category-dv p-r'}>
        <div className={'category-l'}>
          <ScrollView scrollY className={'sv'}>
            {
              category && category.length > 0 && category.map((item: any, index: number) => {
                return (
                  <div className={'f-a-c f-s14'} key={index} onClick={() => { change(index) }}>
                    <div className={`${active === index ? 'sx-active' : 'sx'}`}></div>
                    <div className={`p-10`} key={index}>{item.name}</div>
                  </div>
                )
              })
            }
          </ScrollView>
        </div>
        <div className={'category-r f-s14'}>
          <div className={'category-r-t p-10'}>
            <ScrollView scrollX className={'w-s-n'} scrollIntoView={`c-${id}`}>
              {
                secontLevel.length > 0 && secontLevel.map((item: any, index: number) => {
                  return (
                    <div onClick={() => { changeLevel(index, item) }} className={`item ${activeLevel === index ? 'active' : ''}`} key={index}>{item.name}</div>
                  )
                })
              }
            </ScrollView>
          </div>
          <div className={'m-t10 pro-dv'}>
            {
              list.length && list.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <div className={'f-s16'} id={`c-${item._id}`}>{item.name}</div>
                    {
                      item.list && item.list.map((item1: any) => {
                        return (
                          item1[item.name] && item1[item.name].map((item2: any, index2: number) => {
                            return (
                              <div className={'f-a-c pro-item m-t-b10'} key={index2} onClick={() => { goto(item2) }}>
                                <div><img src={item2.cover} className='img br-10' /></div>
                                <div className={'m-l10'}>
                                  <div className={'name sl-one'}>{item2.name}</div>
                                  <div className={'m-t10'}>￥{item2.presentPrice}</div>
                                </div>
                              </div>
                            )
                          })
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default category
