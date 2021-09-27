import Header from '../../components/search/header/header'
import { useState, useEffect } from 'react';
import utils from '../../utils/util'
import clear from '../../static/clear.png'
import './search.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getSearchWords, getSearch } from '../../store/actions/product'
import Taro from '@tarojs/taro'

const search = () => {
  let dispatch = useDispatch()
  let hot = useSelector((state: any) => state.product.hot)
  let searchList = useSelector((state: any) => state.product.search.data)
  let [isBack,setIsBack] = useState(true)
  let [value, setValue] = useState('')
  //获取历史搜索记录
  let [history, setHistory] = useState<any>()
  useEffect(() => {
    setHistory(utils.getHistory('xm-history'))
    dispatch(getSearchWords())
  }, [])
  const changeValue = (val: string) => {
    setValue(val)
    dispatch(getSearch(val))
  }
  //点击搜索记录
  const change = (e: string, index: number) => {
    if (index) {
      utils.saveHistory({
        key: 'xm-history',
        data: e,
        item: ''
      })
    }
    Taro.navigateTo({ url: `/pages/list/list?keyword=${e}` })
  }
  //清空搜索历史记录
  const remove = () => {
    utils.removeHistory('xm-history', '', '')
    setHistory(utils.getHistory('xm-history'))
  }
  //跳转到详情
  const goto = (item: any) => {
    Taro.navigateTo({ url: `/pages/detail/detail?id=${item._id}` })
  }
  return (
    <div className={'search-b'}>
      {/* 顶部搜索 */}
      <Header value={value} changeValue={changeValue} isBack={isBack}></Header>
      {
        !value ?
          <>
            {/* 搜索历史记录 */}
            {
              history && history.length > 0 ?
                <div className={'p-10'}>
                  <div className={'f-j-b'}>
                    <div className={'f-s16'}>搜索历史</div>
                    <img src={clear} style={{ width: 25, height: 25 }} onClick={remove} />
                  </div>
                  <div className={'f-a-c f-w m-t10 f-s16 history'}>
                    {
                      history && history.length > 0 && history.map((item: any, index: number) => {
                        return (
                          item ?
                            <div key={index} className={'item br-20 m-r10 f-s14 m-b10'} onClick={() => { change(item, 0) }}>{item}</div>
                            : null
                        )
                      })
                    }
                  </div>
                </div> : null
            }

            {/* 搜索发现 */}
            <div className={'p-10'}>
              <div className={'f-s16'}>搜索发现</div>
              <div className={'f-a-c f-w m-t10 f-s14 find p-l-r10'}>
                {
                  hot && hot.length && hot.map((item: any, index: number) => {
                    return (
                      <div key={index} onClick={() => { change(item.name, 1) }} className={'item m-b10'}>{item.name}</div>
                    )
                  })
                }
              </div>
            </div>
          </> :
          <div className={'p-10'}>
            {
              searchList && searchList.length && searchList.map((item: any, index: number) => {
                return (
                  <div className={'b-b f-s16 p-tb10'} key={index} onClick={() => { goto(item) }}>{item.name}</div>
                )
              })
            }
          </div>
      }

    </div>
  )
}

export default search
