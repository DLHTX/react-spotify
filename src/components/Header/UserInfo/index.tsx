import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import { inject, observer } from 'mobx-react'
import React, { useState } from 'react'
import { IAuthStore } from '../../../store/interface/IAuthStore'
import styles from "./style.module.css"

interface IProps {
  AuthStore?: IAuthStore
}
const UserInfo: React.FC<IProps> = ({ AuthStore }) => {
  const handleMenuClick = (e:any) => {
    console.log(e)
    
  }
  const [visible, setVisible] = useState(false)

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">登出</Menu.Item>
    </Menu>
  )

  return (
    <div className={'ml-auto mr-5 text-white'}>
      <Dropdown
        overlay={menu}
        onVisibleChange={(flag) => setVisible(flag)}
        visible={visible}
      >
        <div className={`flex justify-center items-center cursor-pointer ${styles.userBox}`} onClick={(e) => e.preventDefault()}>
          <img className="mr-2" src={AuthStore?.userInfo.profile.avatarUrl} alt="" style={{height:'20px',width:"20px",borderRadius:"50%"}}/>
          <span>{AuthStore?.userInfo.profile.nickname}</span>
          <DownOutlined />
        </div>
      </Dropdown>
    </div>
  )
}

export default inject('AuthStore')(observer(UserInfo))
