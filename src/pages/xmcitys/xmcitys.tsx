import { useState, useEffect } from 'react'
import './xmcitys.scss'
import Header from '../../components/header/Header'
import Taro from '@tarojs/taro';
import { AtSearchBar, AtIndexes } from 'taro-ui'
import { useDispatch, useSelector } from 'react-redux'
import { getAreaList, searchAreaList } from '../../store/actions/home'
import { ScrollView } from '@tarojs/components';
import { useReactive } from 'ahooks';

const citys = () => {
  let dispatch = useDispatch()
  let citys = useSelector((state: any) => state.home.citys)
  let area = useSelector((state: any) => state.home.area)
  let [id, setId] = useState('')
  let type = Taro.getEnv()
  let data = useReactive({
    key: '',
    value: ''
  })
  useEffect(() => {
    dispatch(getAreaList())
  }, [])
  const onChange = (val: string) => {
    data.value = val
    search()
  }
  const changeBar = (e: string) => {
    data.key = e
  }
  const onConfirm = () => {
    search()
  }
  const search = () => {
    data.value && dispatch(searchAreaList(data.value))
  }
  //点击城市跳转到小米之家
  const goto = (item: any) => {
    Taro.setStorageSync('home', item)
    Taro.navigateTo({
      url: `/pages/xmhome/xmhome`
    })
  }
  return (
    <div className={'xm-citys'}>
      {
        type === 'WEB' ? <Header title={'小米之家'}></Header> : null
      }
      <div className={'p-f search'}>
        <AtSearchBar
          onChange={(val: string) => { onChange(val) }}
          onConfirm={onConfirm}
          onActionClick={onConfirm}
        />
      </div>
      {
        data.value ?
          <div className={'p-10 f-s16'}>
            {
              area && area.length > 0 && area.map((item: any, index: number) => {
                return (
                  <div key={index} className={'m-t5'} onClick={() => { goto(item) }}>
                    {item.name}
                  </div>
                )
              })
            }
          </div>
          : <>
            <ScrollView scrollY className={'sc'} >
              <div className={'p-10 f-s16'}>
                {
                  citys && citys.length > 0 && citys.map((item: any, index: number) => {
                    return (
                      <div key={index}>
                        <div className={'bc-e p-l10 m-t10'} id={item.key}>{item.key}</div>
                        {
                          item.items.map((i: any, i1: number) => {
                            return (
                              <div key={i1} className={'p-l10 m-t5'} onClick={() => { goto(i) }}>{i.name}</div>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
              </div>
            </ScrollView>
            <div className={'bar p-f'}>
              <ScrollView scrollY scrollIntoView={data.key} >
                {
                  citys && citys.length > 0 && citys.map((item: any, index: number) => {
                    return (
                      <div key={index}>
                        <div className={'p-l10 item f-s12'}
                          onClick={() => { changeBar(item.key) }}>{item.key}</div>
                      </div>
                    )
                  })
                }
              </ScrollView>
            </div></>
      }
    </div>
  )
}

export default citys
