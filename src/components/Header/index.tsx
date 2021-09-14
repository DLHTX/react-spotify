import React from 'react'
import styles from './style.module.css'
import classnames from 'classnames'
import {Header} from "antd/lib/layout/layout";

interface IProps {
    helloString?: string
}

const HeaderBar: React.FC<IProps> = ({helloString}) => {
    return (
        <Header className={styles.header} style={{position: 'fixed', zIndex: 1, width: '100%'}}>Header</Header>
    )
}

export default HeaderBar
