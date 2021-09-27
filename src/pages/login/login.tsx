import { useState, useEffect } from 'react'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import './index.scss'
import Bgc from '../../static/login-bgc.png'
import log from '../../static/login.png'
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, phoneLogin, register, senCode } from '../../store/actions/user'

const Login = () => {
  let [username, setUserName] = useState('')
  let [password, setPassword] = useState('')
  let [mobile, setMobile] = useState('')
  let [code, setCode] = useState('')
  let isSuccess = useSelector((state: any) => state.user.isSuccess)
  let sendData = useSelector((state: any) => state.user.send)
  let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
  let dispatch = useDispatch()
  let [text, setText] = useState('发送验证码')
  //1:手机号登录 0:账号密码登录 2:注册
  let [type, setType] = useState(0)

  //用户名+密码登录验证
  const checkUserLogin = () => {
    if (!username.trim() || !password.trim()) {
      Taro.showToast({
        title: '用户名和密码都不能为空',
        icon: 'none'
      })
    } else {
      if (password.length >= 6 && password.length < 10) {
        //发请求
        dispatch(userLogin({
          username: username,
          password: password
        }))
      } else {
        Taro.showToast({
          title: '密码长度为6-10位',
          icon: 'none'
        })
      }
    }
  }
  //手机号登录验证
  const checkPhoneLogin = () => {
    if (!mobile.trim() || !code.trim()) {
      Taro.showToast({
        title: '手机号和验证码都不能为空',
        icon: 'none'
      })
    } else {
      if (reg.test(mobile)) {
        //发请求
        dispatch(phoneLogin({
          mobile: mobile,
          code: code
        }))
      } else {
        Taro.showToast({
          title: '手机号输入有误',
          icon: 'none'
        })
      }
    }
  }
  //注册验证
  const checkRegister = () => {
    if (!mobile.trim() || !code.trim() || !username.trim() || !password.trim()) {
      Taro.showToast({
        title: '所有信息都不能为空',
        icon: 'none'
      })
    } else {
      if (!reg.test(mobile)) {
        Taro.showToast({
          title: '手机号输入有误',
          icon: 'none'
        })
      } else if (password.length < 6 || password.length > 10) {
        Taro.showToast({
          title: '密码长度为6-10位',
          icon: 'none'
        })
      } else {
        //发请求
        dispatch(register({
          username: username,
          password: password,
          mobile: mobile,
          code: code
        }))
      }
    }
  }
  //点击确定
  const onSubmit = () => {
    
    if (type === 0) {
      checkUserLogin()
    } else if (type === 1) {
      checkPhoneLogin()
    } else {
      checkRegister()
    }
  }
  const changeUserName = (val: string) => {
    setUserName(val)
  }
  const changeMobile = (val: string) => {
    setMobile(val)
  }
  const changeCode = (val: string) => {
    setCode(val)
  }
  const changePsd = (val: string) => {
    setPassword(val)
  }
  //发送验证码
  const send = () => {
    if (mobile.trim()) {
      if (reg.test(mobile)) {
        dispatch(senCode({ mobile: mobile }))
      } else {
        Taro.showToast({
          title: '手机号输入有误',
          icon: 'none'
        })
      }
    } else {
      Taro.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
    }
  }
  useEffect(() => {
    if (isSuccess) setType(0)
    if (sendData && sendData.code === 200) {
      let num = 60
      let timer = setInterval(() => {
        num--
        setText(`${num}s后重新发送`)
        if (num === 0) {
          clearInterval(timer)
          setText(`发送验证码`)
        }
      }, 1000)
    }
  }, [isSuccess, sendData])
  return (
    <div className={'f-j-c login'}>
      <div>
        <div className={'top'}>
          <img src={Bgc} className={'bgc'} />
          <div className={'f-j-c log-dv'}>
            <div>
              <div className={'f-j-c'}><img src={log} className={'log'} /></div>
              <div className={'f-s12 f-c-9 m-t10'}>让每个人都能享受科技的乐趣</div>
            </div>
          </div>
        </div>
        <div className={'form'}>
          <AtForm
          >
            {
              type === 0 || type === 2 ?
                <>
                  <AtInput
                    required
                    name='username'
                    title='用户名'
                    type='text'
                    placeholder='请输入用户名'
                    value={username}
                    onChange={(val: string) => { changeUserName(val) }}
                  />
                  <AtInput
                    required
                    name='password'
                    title='密码'
                    type='password'
                    placeholder='请输入密码'
                    value={password}
                    onChange={(val: string) => { changePsd(val) }}
                  />
                </> : null
            }

            {
              type !== 0 ?
                <>
                  <AtInput
                    required
                    name='mobile'
                    title='手机号'
                    type='text'
                    placeholder='请输入手机号'
                    value={mobile}
                    onChange={(val: string) => { changeMobile(val) }}
                  />
                  <AtInput
                    required
                    name='code'
                    title='验证码'
                    type='text'
                    placeholder='请输入验证码'
                    value={code}
                    onChange={(val: string) => { changeCode(val) }}
                  >
                    <AtButton className={'m-r10'} disabled={text !== '发送验证码'} onClick={send}>{text}</AtButton>
                  </AtInput>
                </>
                : null
            }

            <AtButton className={'m-t20 m-lr10'} type="primary" onClick={onSubmit}>提交</AtButton>
          </AtForm>
        </div>
        <div className={'f-c-9 f-s16 f-j-c m-t10'}>
          <div className={'f-a-c'}>
            {
              type === 0 ? <div onClick={() => { setType(1) }}>手机号登录</div> : <div onClick={() => { setType(0) }}>账号密码登录</div>
            }
            <div className={'m-lr10'}>|</div>
            <div onClick={() => { setType(2) }}>注册</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
