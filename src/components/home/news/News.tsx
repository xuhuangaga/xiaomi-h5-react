import { useSelector } from 'react-redux'
import './index.scss'
import Taro from '@tarojs/taro'

const News = () => {
   //跳转到详情
   const goto=(item:any)=>{
    Taro.navigateTo({url:`/pages/detail/detail?id=${item._id}`})
  }
  let news = useSelector((state: any) => state.home.new)
  return (
    <div className={'bc-w p-10 news'}>
      <div className={'f-s20 f-w-b f-c-6'}>人气上新</div>
      <div className={'m-t10'}>
        <div className={'f-a-c'}>
          {
            news && news.length > 2 && news.slice(0, 3).map((item: any, index: number) => {
              return (
                <div className={`${index === 0 ? 'f-2' : 'f-1'} item`} key={index} onClick={()=>goto(item)}>
                  <div className={`cover-dv br-10 f-j-c ${index === 1 ? 'm-lr10' : ''}`}>
                    {
                      index===0?<img src={item.cover} className={'wbfb hbfb br-10'} />
                      :<img src={item.cover} className={'img-small br-10'} />
                    }
                    
                  </div>
                  <div className={'f-j-c b-c-w m-t10'}>
                    <div className={`sl-one f-s12 f-c-9 ${index===0?'name-o':'name'}`}>{item.name}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default News
