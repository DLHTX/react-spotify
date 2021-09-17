import { inject, observer } from 'mobx-react'
import styles from "./style.module.css"

const CollectionTypeBar = () => {
  return (
    <div className={'mr-5 text-white ml-4 flex'}>
      <div className={`${styles.buttonActive} ${styles.button}`}>歌单</div>
    </div>
  )
}

export default inject('AuthStore')(observer(CollectionTypeBar))
