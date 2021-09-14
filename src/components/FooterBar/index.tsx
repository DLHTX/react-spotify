import { Footer } from 'antd/lib/layout/layout';
import React from 'react';
import styles from './style.module.css'

const FooterBar = () => {
    return (
        <Footer className={styles.root}>
            <div>
                封面图片
                名称
                制作人
            </div>
            <div>
                剧中导航条
            </div>
        </Footer>
    );
}

export default FooterBar;
