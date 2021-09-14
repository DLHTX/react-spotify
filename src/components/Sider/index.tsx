import React from 'react'
import styles from './style.module.css'
import classnames from 'classnames'
import Sider from "antd/lib/layout/Sider";

interface IProps {
    helloString?: string
}

const SiderBar: React.FC<IProps> = ({helloString}) => {
    return (
        <Sider className={styles.root}>
            <div>主页</div>
            <div>探索</div>
            <div>音乐库</div>
        </Sider>
    )
}

export default SiderBar
