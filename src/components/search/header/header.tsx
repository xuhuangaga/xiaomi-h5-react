import './index.scss'
import { AtSearchBar } from 'taro-ui'
import utils from '../../../utils/util'
import Taro from '@tarojs/taro'
import back from '../../../static/back.png'

interface Props {
  value: string,
  changeValue: (val: string) => void,
  isBack?: boolean
}
const header = (props: Props) => {
  let type=Taro.getEnv()
  const handleChange = (e: string) => {
    props.changeValue(e)
  }
  //点击搜索按钮
  const confirm = () => {
    //存储搜索内容到本地
    utils.saveHistory({
      key: 'xm-history',
      data: props.value,
      item: ''
    })
    // 跳转到商品列表
    Taro.navigateTo({ url: `/pages/list/list?keyword=${props.value}` })
  }
  //点击返回上一页
  const goBack=()=>{
    Taro.navigateBack()
  }
  return (
    <div className={'p-10 search-h f-j-b'}>
      {props.isBack && type==='WEB' ? <div>
        <img src={back} style={{width:20,height:20}} onClick={goBack} />
      </div> : null}
      <AtSearchBar
        value={props.value}
        onChange={(e: string) => { handleChange(e) }}
        onConfirm={confirm}
        onActionClick={confirm}
        className={'wbfb'}
      />
    </div>
  )
}

export default header
