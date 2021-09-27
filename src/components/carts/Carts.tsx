import { useState, useEffect } from 'react'
import { AtInputNumber } from 'taro-ui'
import './index.scss'
import { useDispatch } from 'react-redux'
import { updateCart, delCart } from '../../store/actions/product'
import { useReactive } from 'ahooks'
import { Checkbox, CheckboxGroup } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useComputed } from '../../hooks/useComputed'

interface Props {
  carList: any
}
const Carts = (props: Props) => {
  let dispatch = useDispatch()
  let type = Taro.getEnv()
  let [text, setText] = useState('编辑')
  let data = useReactive({
    carList: props.carList
  })
  let [checkAll, setCheckAll] = useState(false)
  let [checkAllDel, setCheckAllDel] = useState(false)
  let user = Taro.getStorageSync('xm-user')
  useEffect(() => {
    data.carList && data.carList.length > 0 && data.carList.map((item: any) => {
      item.checked = false
      item.isDelete = false
    })
  }, [])
  const checkdAll = (e: any) => {
    checkAll = !checkAll
    setCheckAll(checkAll)
    data.carList.map((i: any) => {
      i.checked = checkAll
    })
  }
  const checkdAllDel = (e: any) => {
    checkAllDel = !checkAllDel
    setCheckAllDel(checkAllDel)
    data.carList.map((i: any) => {
      i.isDelete = checkAllDel
    })
  }
  const changeCount = (val: number, item: any) => {
    item.count = val
    dispatch(updateCart({
      id: item._id,
      user_id: user._id,
      count: val
    }))
  }
  const checked = (item: any) => {
    if (text === '编辑') {
      item.checked = !item.checked
      checkAll = data.carList.every((i: any) => {
        return i.checked
      })
      setCheckAll(checkAll)
    } else checkedDel(item)
  }
  const checkedDel = (item: any) => {
    item.isDelete = !item.isDelete
    checkAllDel = data.carList.every((i: any) => {
      return i.isDelete
    })
    setCheckAllDel(checkAllDel)
  }
  const changeText = () => {
    if (text === '编辑') setText('完成')
    else setText('编辑')
  }
  //点击删除
  const del = () => {
    let arr = data.carList.filter((item: any) => {
      return item.isDelete
    })
    if (arr.length > 0) {
      arr.map((item: any) => {
        dispatch(delCart({
          id: item._id,
          user_id: user._id
        }))
      })
      data.carList = data.carList.filter((item: any) => {
        return !item.isDelete
      })
    } else {
      Taro.showToast({
        title: '请选择需要删除的商品',
        icon: 'none'
      })
    }
  }
  //点击去结算
  const pay = () => {
    let arr = data.carList.filter((item: any) => {
      return item.checked
    })
    if (arr.length > 0) {
      Taro.setStorageSync('isCar', '1')
      //立即购买
      Taro.setStorageSync('toBePay', arr)
      Taro.setStorageSync('defaultAddress', null)
      Taro.navigateTo({
        url: "/pages/orders/orders"
      })
    } else {
      Taro.showToast({
        title: '请选择需要结算的商品',
        icon: 'none'
      })
    }
  }
  //跳转到详情
  const goto = (item: any) => {
    Taro.navigateTo({ url: `/pages/detail/detail?id=${item.goods._id}` })
  }
  const money = useComputed(()=>{
    let money=0
    data.carList.map((i: any) => {
      if (i.checked) {
         money += Number(i.goods.presentPrice * i.count)
      }
    })
    return money;
  },[data.carList])
  return (
    <div className={'f-s16 carts-b m-t20'}>
      <div className={'f-j-b'}>
        <div className={'f-a-c'}>
          {
            text === '编辑' ? <CheckboxGroup onChange={(e: any) => { checkdAll(e) }}>
              <Checkbox checked={checkAll} ></Checkbox>
            </CheckboxGroup> : <CheckboxGroup onChange={(e: any) => { checkdAllDel(e) }}>
              <Checkbox checked={checkAllDel} ></Checkbox>
            </CheckboxGroup>
          }
          <div className={'m-l5'}>小米自营</div>
        </div>
        <div className={'f-a-c'}>
          <div onClick={changeText}>{text}
          </div>
          {text === '完成' ? <div className={'m-l5'} onClick={del}>删除</div> : null}
        </div>
      </div>
      <div className={'m-t20'} style={{ paddingBottom: 80 }}>
        {
          data.carList && data.carList.length > 0 && data.carList.map((item: any, index: number) => {
            return (
              <CheckboxGroup className={'f-j-b item m-b10 b-b p-b10'} key={index} onChange={() => { checked(item) }}>
                <div>
                  {
                    text === '编辑' ? <Checkbox checked={item.checked} ></Checkbox>
                      : <Checkbox checked={item.isDelete} ></Checkbox>
                  }
                </div>
                <div onClick={() => { goto(item) }}><img src={item.goods.cover} className={'img'} /></div>
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
                  <div>
                    <AtInputNumber
                      min={1}
                      step={1}
                      value={item.count}
                      onChange={(val: number) => { changeCount(val, item) }}
                      className={'m-t20'} type={'number'} />
                  </div>

                </div>
                <div>x{item.count}</div>
              </CheckboxGroup>
            )
          })
        }
      </div>
      <div className={`f-j-b bottom p-f p-10 bc-w z ${type==='WEB'?'b-px':'b-px1'}`}>
        <div className={'f-a-c'}><CheckboxGroup onChange={(e: any) => { checkdAll(e) }}>
          <Checkbox checked={checkAll} ></Checkbox>
        </CheckboxGroup>
          <div className={'m-l5'}>全选</div>
        </div>
        <div className={'f-a-c p-tb10'}>
          <div className={'f-a-c'}>
            <div>合计</div>
            <div className={'price'}>￥{money}元</div>
          </div>
          <div className={'f-c-w pay m-l10'} onClick={pay}>去结算</div>
        </div>
      </div>
    </div>
  )
}

export default Carts
