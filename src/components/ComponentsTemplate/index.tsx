import React from 'react'
import styles from './style.module.css'
import classnames from 'classnames'

interface IProps {
    helloString?: string
}

const HelloWorld: React.FC<IProps> = ({helloString}) => {
    return (
        <div className={classnames(styles.singer)}>
            {helloString}
        </div>
    )
}

export default HelloWorld
