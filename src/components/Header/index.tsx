import React, { useCallback, useEffect } from 'react'
import styles from './style.module.css'
import classnames from 'classnames'
import { Header } from 'antd/lib/layout/layout'
import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons'
import { useHistory, useRouteMatch } from 'react-router-dom'
import Button from 'antd/lib/button'
import PreButton from '../Buttons/PreButton'
import NextButton from '../Buttons/NextButton'
import ROUTES from '../../router'
import { inject, observer } from 'mobx-react'
import { IAuthStore } from '../../store/interface/IAuthStore'
import UserInfo from './UserInfo'
import { Input } from 'antd'
import MusicStore from '../../store/musicStore'
import { IMusicStore } from '../../store/interface/IMusicStore'
import CollectionTypeBar from './CollectionTypeBar'

interface IProps {
  AuthStore?: IAuthStore
  MusicStore?: IMusicStore
}

const HeaderBar: React.FC<IProps> = ({ AuthStore, MusicStore }) => {
  const history = useHistory()

  const handleGoBack = () => history.goBack()
  const handleGoForward = () => history.goForward()
  const handleLogin = () => {
    history.push(ROUTES.LOGIN)
    console.log(history)
  }

  const showInput = useRouteMatch(ROUTES.HOME_SEARCH)
  const showCollectionTypeBar = useRouteMatch({
    path: ROUTES.COLLECTION_BASE,
    strict: false,
    sensitive: true
  })

  useEffect(() => {
    console.log(showCollectionTypeBar)
  }, []);

  return (
    <Header
      className={styles.header}
      style={{ position: 'fixed', zIndex: 1, width: 'calc(100% - 150px)' }}
    >
      <PreButton onClick={handleGoBack}></PreButton>

      <NextButton className={'ml-4'} onClick={handleGoForward}></NextButton>

      {showInput ? (
        <Input
          size={'large'}
          placeholder={'防止频繁搜索，输入完毕回车后才能搜索'}
          prefix={<SearchOutlined />}
          style={{ width: '400px', marginLeft: '20px', borderRadius: '43px' }}
          onPressEnter={(e:any) =>{
            console.log(e.target.value)
            MusicStore?.SET_SEARCH_VALUE(e.target.value)
          }}
        ></Input>
      ) : null}

      {
        showCollectionTypeBar?
        <CollectionTypeBar></CollectionTypeBar>:null
      }

      {AuthStore?.userInfo && AuthStore?.userInfo.token ? (
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

export default inject('AuthStore', 'MusicStore')(observer(HeaderBar))
