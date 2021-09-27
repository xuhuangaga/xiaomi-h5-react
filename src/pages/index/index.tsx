import {useEffect} from 'react'
import Header from '../../components/home/header/Header'
import Banner from '../../components/home/banner/Banner'
import Nav from '../../components/home/nav/Nav'
import News from '../../components/home/news/News'
import RecommNav from '../../components/home/recommnav/RecommNav'
// import Tabbar from '../../components/tabbar/Tabbar'
import { useDispatch } from 'react-redux'
import { getBanner,getNav,getNew,getRecommNav,getNotice } from '../../store/actions/home'
import './index.scss'


const index = () => {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBanner())
    dispatch(getNav())
    dispatch(getNew())
    dispatch(getRecommNav())
    dispatch(getNotice())
  }, [])
  return (
    <div className={'index'}>
      <Header></Header>
      <Banner></Banner>
      <Nav></Nav>
      <News></News>
      <RecommNav></RecommNav>
      {/* <Tabbar></Tabbar> */}
    </div>
  )
}

export default index
