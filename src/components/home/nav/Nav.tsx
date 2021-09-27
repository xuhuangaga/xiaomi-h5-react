import { useSelector } from 'react-redux';
import './index.scss'

const Nav = () => {
  let nav = useSelector((state: any) => state.home.nav)
  return (
    <div className={'f-j-b f-w m-t10'}>
      {
        nav && nav.map((item: any, index: number) => {
          return (
            <img src={item.url} key={index} className={'img'} />
          )
        })
      }
    </div>
  )
}

export default Nav
