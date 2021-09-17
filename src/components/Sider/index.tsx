import React from 'react'
import styles from './style.module.css'
import Sider from 'antd/lib/layout/Sider'
import { useHistory, useRouteMatch } from 'react-router-dom'
import ROUTES from '../../router/index'
import classNames from 'classnames'
import logo from "../../assets/image/logo.png"

const SiderBar: React.FC = () => {
  const history = useHistory()

  let go = (path: string) => {
    console.log(path)
    history.push(path)
  }

  const sideBarList = [
    {
      id: 1,
      icon: (
        <svg
          className={'mr-2'}
          viewBox="0 0 512 512"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z"
            fill="currentColor"
          ></path>
        </svg>
      ),
      name: '主页',
      route: ROUTES.HOME_DISCOVERY,
      isActive: useRouteMatch(ROUTES.HOME_DISCOVERY)
    },
    {
      id: 2,
      icon: (
        <svg
          className={'mr-2'}
          viewBox="0 0 512 512"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z"
            fill="currentColor"
            fill-rule="evenodd"
          ></path>
        </svg>
      ),
      name: '搜索',
      route: ROUTES.HOME_SEARCH,
      isActive: useRouteMatch(ROUTES.HOME_SEARCH),
    },
    {
      id: 3,
      icon: (
        <svg
          className={'mr-2'}
          viewBox="0 0 512 512"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z"
            fill="currentColor"
          ></path>
        </svg>
      ),
      name: '音乐库',
      route: ROUTES.COLLECTION_BASE + '/playlist',
      isActive: useRouteMatch(ROUTES.COLLECTION),
    },
  ]

  return (
    <Sider className={styles.root}>
      <div className={'mb-5'}>
        <img className={styles.logo} src={logo} alt="" onClick={()=>window.open('https://github.com/DLHTX/react-spotify')}/>
      </div>

      {sideBarList.map((data) => {
        return (
          <div
            key={data.id}
            className={classNames(
              `${styles.sideBarItem}`,
              `${data.isActive ? styles.sideBarItemActive : null}`,
            )}
            onClick={() => go(data.route)}
          >
            {data.icon}
            <span>{data.name}</span>
          </div>
        )
      })}
    </Sider>
  )
}

export default SiderBar
