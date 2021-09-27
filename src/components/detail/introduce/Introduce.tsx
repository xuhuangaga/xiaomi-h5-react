import { useState } from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'

interface Props {
  detail: any
}
const Introduce = (props:Props) => {
  const tabList = [{ title: '商品介绍' }, { title: '商品规格' }]
  let [current, setCurrent] = useState(0)
  const handleClick = (index: number) => {
    setCurrent(index)
  }
  return (
    <div className={'m-t10'}>
      <AtTabs current={current} tabList={tabList} onClick={(index: number) => handleClick(index)}>
        <AtTabsPane current={current} index={0}>
          <div dangerouslySetInnerHTML={{__html:props.detail.detail}} className={'f-s0'}></div>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <div dangerouslySetInnerHTML={{__html:props.detail.specParams}} className={'f-s0'}></div>
        </AtTabsPane>
      </AtTabs>
    </div>
  )
}

export default Introduce
