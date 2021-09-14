import React from 'react'
import styles from './style.module.css'
import classnames from 'classnames'
import { Header } from 'antd/lib/layout/layout'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import Button from 'antd/lib/button'
import PreButton from '../Buttons/PreButton'
import NextButton from '../Buttons/NextButton'

interface IProps {
  helloString?: string
}

const HeaderBar: React.FC<IProps> = ({ helloString }) => {
  const history = useHistory()

  const handleGoBack = () => history.goBack()
  const handleGoForward = () => history.goForward()

  return (
    <Header
      className={styles.header}
      style={{ position: 'fixed', zIndex: 1, width: 'calc(100% - 150px)' }}
    >
      <PreButton onClick={handleGoBack}></PreButton>

      <NextButton className={'ml-4'} onClick={handleGoForward}></NextButton>

      <Button className={'ml-auto mr-5'} type="default" shape="round">
        登录
      </Button>
    </Header>
  )
}

export default HeaderBar
