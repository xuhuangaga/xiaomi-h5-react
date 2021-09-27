import { useSelector } from 'react-redux'
import { Swiper, SwiperItem } from '@tarojs/components'
import { AtNoticebar } from 'taro-ui'
import { useEffect, useState } from 'react'

const Banner = () => {
  let banner = useSelector((state: any) => state.home.banner)
  let notice = useSelector((state: any) => state.home.notice)
  return (
    <div>
      <AtNoticebar marquee close>
        {
          notice.length&&notice.map((item:any)=>{
            return (
              item.content
            )
          })
        }
        {/* {arr.join(' ')} */}
      </AtNoticebar>
      <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay>
        {
          banner && banner.map((item: any, index: number) => {
            return (
              <SwiperItem key={index}>
                <img src={item.url} className={'wbfb hbfb'} />
              </SwiperItem>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default Banner
