import { Swiper, SwiperItem } from '@tarojs/components'
import './index.scss'

interface Props {
  detail: any
}
const Banner = (props: Props) => {
  return (
    <div className={'detail-banner'}>
      <Swiper className={'swipter'} autoplay indicatorDots>
        {
          props.detail &&props.detail.pic && props.detail.pic.map((item: any, index: number) => {
            return (
              <SwiperItem key={index}>
                <img src={item} className={'wbfb hbfb'} />
              </SwiperItem>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default Banner
