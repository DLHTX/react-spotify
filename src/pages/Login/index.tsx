import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './style.module.css'
import { Divider, Input } from 'antd'
import { useHistory } from 'react-router-dom'
import logo from "../../assets/image/logo-black.png"

interface IProps {
  AuthStore?: any
}
const Login: React.FC<IProps> = ({ AuthStore }) => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const login = async (phone: string, password: string) => {
    let res = await AuthStore.login(phone, password)
    console.log(res)
    history.push('/')
  }
  return (
    <div>
      <div
        className={`flex items-center justify-center w-full  mb-4 py-4 ${styles.logoBox}`}
      >
        <img
          className={styles.logo}
          src={logo}
          alt=""
        />
      </div>

      <div
        className={`flex items-center justify-center w-full  mb-4 py-4 font-bold`}
      >
        请在此登录网易云的账号
      </div>

      <div className={'w-4/12 mx-auto'}>
        <div className={'font-bold text-lg mb-2'}>此处是电话号码</div>

        <Input
          placeholder="输入电话号码"
          size="large"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPhone(event.target.value)
          }}
        />

        <div className={'font-bold text-lg mb-2 mt-4'}>密码</div>

        <Input
          placeholder="输入你的密码"
          size="large"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value)
          }}
        />

        <div className={'font-bold  mb-2 mt-4 underline'}>忘记密码？</div>

        <div
          className={`${styles.loginBtn} flex justify-center items-center mt-2 ml-auto`}
          onClick={() => login(phone, password)}
        >
          登录
        </div>

        <Divider />

        <div className={'font-bold  mb-2 mt-6 text-center text-lg'}>
          没有帐号？
        </div>
      </div>
    </div>
  )
}

export default inject('AuthStore')(observer(Login))
