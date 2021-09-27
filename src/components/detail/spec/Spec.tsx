import { useState, useEffect } from 'react'
import right from '../../../static/right.png'
import { AtFloatLayout, AtInputNumber } from "taro-ui"
import './index.scss'
import utils from '../../../utils/util'
import Taro from '@tarojs/taro';

interface Props {
  detail: any,
  defaultSpec: any,
  count: number,
  changeSpec: (val: any) => void,
  changeCount: (val: any) => void,
  checkLogin: (index: number) => void
}
const Spec = (props: Props) => {
  let [show, setShow] = useState(false)
  let [address, setAddress] = useState('定位中')
  const handleChange = (val: number) => {
    props.changeCount(val)
  }
  const choice = () => {
    setShow(true)
  }
  //切换规格
  const changeSpec = (item: any, spec: string) => {
    props.defaultSpec.map((i: any) => {
      if (i.name === item.name) {
        i.spec = spec
      }
    })
    props.changeSpec([...props.defaultSpec])
  }
  //查看规格是否包含
  const isHave = (item: any, name: string) => {
    if (props.defaultSpec && props.defaultSpec.length > 0) {
      return props.defaultSpec.filter((i: any) => {
        return i.name === item.name && name === i.spec
      }).length > 0
    }
    return false
  }
  const checkLogin = (index: number) => {
    setShow(false)
    props.checkLogin(index)
  }
  useEffect(() => {
    utils.getLocation(null, null, false)
      .then((res: any) => {
        if (Taro.getEnv() === 'WEB') {
          let data = res.data.addressComponent
          setAddress(data.province + data.city + data.district + data.street + data.township)
        } else {
          console.log(res);
          
          setAddress(res.data[0].regeocodeData.formatted_address)
        }
      })
  }, [])
  return (
    <div className={'spec-b'}>
      <div className={'f-a-c m-b10'}>
        <div className={'f-s16'}>已选</div>
        <div className={'b-b f-j-b m-l10'} style={{ width: '88%' }} onClick={choice}>
          <div className={'f-s16 f-a-c'}>
            {
              props.defaultSpec && props.defaultSpec.length > 0 &&
              props.defaultSpec.map((item: any, index: number) => {
                return (
                  <div key={index} className={'f-a-c'}>
                    <div>{item.spec}</div>
                    {
                      index < props.defaultSpec.length - 1 ? item.spec ? <div>+</div> : null : null
                    }
                  </div>
                )
              })
            }
            <div className={'m-l5'}>x{props.count}</div>
          </div>
          <div><img src={right} style={{ width: 20, height: 20 }} /></div>
        </div>
      </div>
      <div className={'f-a-c m-b10'}>
        <div className={'f-s16'}>地址</div>
        <div className={'f-s16 m-l10'}>{address}</div>
      </div>
      {/* 规格弹窗 */}
      {
        show ?
          <AtFloatLayout isOpened title="请选择规格" onClose={() => { setShow(false) }}>
            {
              props.detail.spec && props.detail.spec.length > 0 && props.detail.spec.map((item: any, index: number) => {
                return (
                  item.checkList && item.checkList.length > 0 ?
                    <div key={index} className={'m-t10'}>
                      <div>{item.name}</div>
                      <div className={'f-a-c f-w m-t10'}>
                        {
                          item.checkList && item.checkList.length && item.checkList.map((item1: any, index1: number) => {
                            return (
                              <div key={index1} className={`item m-r10 ${isHave(item, item1) ? 'active' : ''}`} onClick={() => { changeSpec(item, item1) }}>{item1}</div>
                            )
                          })
                        }
                      </div>
                    </div> : null
                )
              })
            }
            <div className={'f-j-e'} style={{ marginBottom: 100 }}>
              <AtInputNumber
                min={1}
                step={1}
                value={props.count}
                onChange={(val: number) => { handleChange(val) }}
                className={'m-t20'} type={'number'} />
            </div>
            <div className={'f-a-c p-f tk-b p-10'}>
              <div className={'carts-btn f-c-w t-a-c f-1'} onClick={() => { checkLogin(0) }}>加入购物车</div>
              <div className={'pay-btn f-c-w t-a-c f-1'} onClick={() => { checkLogin(1) }}>立即购买</div>
            </div>
          </AtFloatLayout> : null
      }

    </div>
  )
}

export default Spec
