import { AtTabBar } from 'taro-ui'

interface Props{
  current:number
}
const Tabbar = (props:Props) => {
  const handle=(e)=>{
    console.log(e);
    
  }
  return (

    <div>
      <AtTabBar
      selectedColor="#ff5934"
        fixed
        tabList={[
          { title: '首页', iconType: 'home'},
          { title: '分类', iconType: 'menu' },
          { title: '购物车', iconType: 'shopping-cart',text:'0' },
          { title: '我的', iconType: 'user' }
        ]}
        onClick={(e:number)=>{handle(e)}}
        current={props.current}
      />
    </div>
  )
}

export default Tabbar
