import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Taro from '@tarojs/taro'
import { AtForm, AtInput, AtButton, AtSwitch } from 'taro-ui'
import Header from '../../components/header/Header'
import { addAddress } from '../../store/actions/user'
import city from '../../lib/city'
import { Picker } from '@tarojs/components'
import { useReactive } from 'ahooks'


const editaddress = () => {
  let dispatch = useDispatch()
  let [username, setUserName] = useState('')
  let [mobile, setMobile] = useState('')
  let [detailAddress, setDetailAddress] = useState('')
  let [isDefault, setIsDefault] = useState(false)
  let type = Taro.getEnv()
  let [rangeData, setRangeData] = useState<any>([[], [], []])
  let [rangeKey, setSangeKey] = useState<any>([0, 0, 0])
  let data = useReactive({
    address: ['请选择省', '请选择市', '请选择区']
  })
  //点击重置
  const reset = () => {
    setUserName('')
    setMobile('')
    data.address = ['请选择省', '请选择市', '请选择区']
    setDetailAddress('')
    setIsDefault(false)
  }
  //点击提交
  const submit = () => {
    let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
    let arr = data.address.filter((item: string) => {
      return item === '请选择省'
    })
    if (username.trim() && mobile.trim() && arr.length === 0 && detailAddress.trim()) {
      if (reg.test(mobile)) {
        //发请求
        dispatch(addAddress({
          user_id: Taro.getStorageSync('xm-user')._id,
          username: username,
          mobile: mobile,
          address: data.address.join(',') + detailAddress,
          detailAddress: detailAddress,
          isDefault: isDefault
        }))
      } else {
        Taro.showToast({
          title: '手机号输入有误',
          icon: 'none'
        })
      }
    } else {
      Taro.showToast({
        title: '所有信息都不能为空',
        icon: 'none'
      })
    }
  }
  const onChange = (e: any) => {
    let arr = e.detail.value
    data.address[0] = rangeData[0][arr[0]]
    data.address[1] = rangeData[1][arr[1]]
    data.address[2] = rangeData[2][arr[2]]
  }
  useEffect(() => {
    handleCityData(0, 0)
  }, [])
  //处理省市区数据
  const handleCityData = (key: number, key1: number) => {
    rangeData = []
    let provinceList = new Array(); // 省
    let cityList = new Array(); // 市
    let areaList = new Array(); // 区
    //获取所有省
    city && city.map((item: any) => {
      provinceList.push(item.label)
    })
    rangeData.push(provinceList)
    if (!key) key = 0
    if (!key1) key1 = 0
    //获取对应省下面的市
    if (city[key].children?.length) {
      let flag = false
      city[key].children!.map((item: any) => {
        if (!item.children && !flag) {
          cityList.push(city[key].label)
          flag = true
        } else if (!flag) {
          cityList.push(item.label)
        }
      })
      rangeData.push(cityList)
    }

    //获取对应市下面的区
    if (city[key].children?.length) {
      if (!city[key].children![0].children) {
        city[key].children!.map((item: any) => {
          areaList.push(item.label)
        })
      } else {
        city[key].children![key1].children!.map((item: any) => {
          areaList.push(item.label)
        })
      }
      rangeData.push(areaList)
    }
    setRangeData(rangeData)
  }
  const onColumnChange = (e: any) => {
    rangeKey[e.detail.column] = e.detail.value
    setSangeKey(rangeKey)
    if (e.detail.column === 0) {
      handleCityData(rangeKey[0], 0)
    } else {
      handleCityData(rangeKey[0], rangeKey[1])
    }
  }
  return (
    <div className={'p-10'}>
      {
        type === 'WEB' ? <Header title={'新增地址'}></Header> : null
      }
      <AtForm
      >
        <AtInput
          required
          name='username'
          title='收货人'
          type='text'
          placeholder='请输入收货人'
          value={username}
          onChange={(val: string) => { setUserName(val) }}
        />
        <AtInput
          required
          name='mobile'
          title='手机号'
          type='text'
          placeholder='请输入手机号'
          value={mobile}
          onChange={(val: string) => { setMobile(val) }}
        />
        <Picker mode="multiSelector" // 多列选择
          onChange={(e: any) => { onChange(e) }} // change事件
          onColumnChange={onColumnChange} // 某列改变的事件
          range={rangeData} //需要展示的数据
          value={rangeKey} // 选择的下标
        >
          <AtInput
            required
            name='address'
            title='省市区'
            type='text'
            placeholder='请输入手机号'
            value={data.address.join('/')}
          />
        </Picker>
        <AtInput
          required
          name='detailAddress'
          title='详细地址'
          type='text'
          placeholder='请输入详细地址'
          value={detailAddress}
          onChange={(val: string) => { setDetailAddress(val) }}
        />
        <AtSwitch title='是否默认' checked={isDefault} onChange={() => { setIsDefault(!isDefault) }} />
        <AtButton onClick={submit} className={'m-t10'}>提交</AtButton>
        <AtButton onClick={reset} className={'m-t10'}>重置</AtButton>
      </AtForm>
    </div>
  )
}

export default editaddress
