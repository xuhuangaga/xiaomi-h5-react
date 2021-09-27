import Header from '../../components/search/header/header'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSearch } from '../../store/actions/product'
import Taro from '@tarojs/taro'
import xjt from '../../static/xjt.png'
import sjt from '../../static/sjt.png'
import xjtSelected from '../../static/xjt-selected.png'
import sjtSelected from '../../static/sjt-selected.png'
import './list.scss'
import { ScrollView } from '@tarojs/components';
import dayjs from 'dayjs'

const list = () => {
  let dispatch = useDispatch()
  let searchList = useSelector((state: any) => state.product.search.data)
  let [list, setList] = useState<any>([])
  let total = useSelector((state: any) => state.product.search.total)
  let [isBack, setIsBack] = useState(true)
  let [value, setValue] = useState('')
  let [sort, setSort] = useState(0)
  let [name, setName] = useState(0)
  let [current, setCurrent] = useState(1)
  let [text, setText] = useState('加载中...')
  // 排序
  let [arr, setArr] = useState(
    [
      { name: '综合', sort: 0 },
      { name: '时间', sort: 1 },
      { name: '价格', sort: 2 }
    ])
  const changeValue = (val: string) => {
    setValue(val)
    setCurrent(1)
    dispatch(getSearch(val, current, 10))
  }
  useEffect(() => {
    setCurrent(1)
    let keyword: string = Taro.getCurrentInstance().router?.params.keyword!
    dispatch(getSearch(keyword, current, 10))
    keyword && setValue(keyword)
  }, [])
  useEffect(() => {
    if(current===1) {
      list=[]
      setList(list)
    }
    if (searchList && searchList.length > 0) {
      list = list.concat(searchList)
      setList(list)
      if (list.length >= total) {
        setText('加载完成')
      }
    }else {
      setText('暂无数据')
    }
  }, [searchList, total])
  //触底
  const touchBottom = () => {
    if (list.length < total) {
      setCurrent(current++)
      dispatch(getSearch(value, current, 10))
    }
  }
  //排序
  const changeSort = (item: any) => {
    setName(item.name)
    if (item.name === '价格') {
      //价格升序
      if (item.sort === 2) {
        list = list.sort((a: any, b: any) => {
          return a.presentPrice - b.presentPrice
        })
        item.sort = 3
      } else {
        //价格降序
        list = list.sort((a: any, b: any) => {
          return b.presentPrice - a.presentPrice
        })
        item.sort = 2
      }
    } else if (item.name === '综合') {
      list = list.sort((a: any, b: any) => {
        return a._id - b._id
      })
    } else {
      list = list.sort((a: any, b: any) => {
        return dayjs(a.create_time).valueOf() - dayjs(b.create_time).valueOf()
      })
    }
    setSort(item.sort)
  }
  //跳转到详情
  const goto = (item: any) => {
    Taro.navigateTo({ url: `/pages/detail/detail?id=${item._id}` })
  }
  return (
    <div className={'proList'}>
      {/* 顶部搜索 */}
      <Header value={value} changeValue={changeValue} isBack={isBack}></Header>
      {/* 排序 */}
      <div className={'f-j-a'}>
        {
          arr.map((item: any, index: number) => {
            return (
              <div key={index} className={'f-s16'}>
                {
                  index === arr.length - 1 ?
                    <div className={'f-a-c'}>
                      <div onClick={() => { changeSort(item) }} className={`${name === item.name ? 'active' : ''}`}>{item.name}</div>
                      {
                        sort === 3 ?
                          <div className={'jt-d m-l5'}>
                            <div className={'jt'}><img src={sjtSelected} className={'jt'} /></div>
                            <div className={'jt'}><img src={xjt} className={'jt'} /></div>
                          </div> : sort === 2 ?
                            <div className={'jt-d m-l5'}>
                              <div className={'jt'}><img src={sjt} className={'jt'} /></div>
                              <div className={'jt'}><img src={xjtSelected} className={'jt'} /></div>
                            </div>
                            : <div className={'jt-d m-l5'}>
                              <div className={'jt'}><img src={sjt} className={'jt'} /></div>
                              <div className={'jt'}><img src={xjt} className={'jt'} /></div>
                            </div>
                      }
                    </div>
                    :
                    <div onClick={() => { changeSort(item) }} className={`${name === item.name ? 'active' : ''}`}>{item.name}</div>
                }
                <div></div>
              </div>
            )
          })
        }
      </div>
      {/* 商品列表 */}
      <div className={'p-10'}>
        <ScrollView scrollY className={'sc'} onScrollToLower={touchBottom}>
          {
            list && list.length > 0 && list.map((item: any, index: number) => {
              return (
                <div className={'f-a-c item b-b m-b10'} key={index} onClick={() => { goto(item) }}>
                  <div>
                    <img src={item.cover} className={'img'} />
                  </div>
                  <div className={'m-l10'}>
                    <div className={'m-b20 name f-s16 sl-one'}>{item.name}</div>
                    <div className={'price'}>￥{item.presentPrice}</div>
                  </div>
                </div>
              )
            })
          }
          <div className={'m-t20 f-j-c f-s16'}><div>{text}</div></div>
        </ScrollView>
      </div>
    </div >
  )
}

export default list
