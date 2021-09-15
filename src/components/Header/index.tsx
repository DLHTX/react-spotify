import React from 'react'
import styles from './style.module.css'
import classnames from 'classnames'
import { Header } from 'antd/lib/layout/layout'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import Button from 'antd/lib/button'
import PreButton from '../Buttons/PreButton'
import NextButton from '../Buttons/NextButton'
import ROUTES from '../../router'
import { inject, observer } from 'mobx-react'
import { IAuthStore } from '../../store/interface/IAuthStore'
import UserInfo from './UserInfo'

interface IProps {
  AuthStore?: IAuthStore
}

const HeaderBar: React.FC<IProps> = ({ AuthStore }) => {
  const history = useHistory()

  const handleGoBack = () => history.goBack()
  const handleGoForward = () => history.goForward()
  const handleLogin = () => {
    history.push(ROUTES.LOGIN)
    console.log(history)
  }

  return (
    <Header
      className={styles.header}
      style={{ position: 'fixed', zIndex: 1, width: 'calc(100% - 150px)' }}
    >
      <PreButton onClick={handleGoBack}></PreButton>

      <NextButton className={'ml-4'} onClick={handleGoForward}></NextButton>
      {AuthStore?.userInfo.token ? (
        <UserInfo></UserInfo>
      ) : (
        <Button
          className={'ml-auto mr-5'}
          type="default"
          shape="round"
          onClick={handleLogin}
        >
          登录
        </Button>
      )}
    </Header>
  )
}

export default inject('AuthStore')(observer(HeaderBar))
