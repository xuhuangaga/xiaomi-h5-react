import caitiao from '../../../static/caitiao.jpg'
import Right from '../../../static/right.png'
import Taro from '@tarojs/taro'

interface Props {
  defaultAddress:any
}
const Address = (props:Props) => {
  //跳转到地址列表
  const goto=()=>{
    Taro.setStorageSync('isOrders',1)
    Taro.navigateTo({url:'/pages/address/address'})
  }
  return (
    <div className={'m-t20 f-s16'}  onClick={goto}>
      {
        props.defaultAddress ?
          <div className={'p-10 f-j-b'}>
            <div>
              <div className={'f-a-c'}>
                <div>{props.defaultAddress.username}</div>
                <div className={'m-l10'}>{props.defaultAddress.mobile}</div>
              </div>
              <div className={'m-t10'}>{props.defaultAddress.address.split(',').join('')}</div>
            </div>
            <div>
              <img src={Right} style={{ width: 30, height: 30 }} />
            </div>
          </div> :
          <div className={'t-a-c p-10'}>请选择收货地址</div>
      }
      <div>
        <img src={caitiao} className={'wbfb'} style={{ height: 5 }}></img>
      </div>
    </div>
  )
}

export default Address
