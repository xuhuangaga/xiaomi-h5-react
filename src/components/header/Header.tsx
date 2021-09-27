import Back from '../../static/back.png'
import Search from '../../static/sousuo.png'
import Taro from '@tarojs/taro';

interface Props {
  title: string
}

const Header = (props: Props) => {
  //返回上一页
  const back = () => {
    Taro.navigateBack()
  }
  //进入搜索页
  const goto = (url: string) => {
    Taro.navigateTo({ url: url })
  }
  return (
    <div className={'f-j-b p-10'}>
      <div onClick={back} className={'f-j-c'}><img src={Back} style={{ width: 28, height: 28 }} /></div>
      <div className={'f-s16'}>{props.title}</div>
      <div  className={'f-j-c'} onClick={() => { goto('/pages/search/search') }}>
        <img src={Search} style={{ width: 30, height: 30 }} /></div>
    </div>
  )
}

export default Header

