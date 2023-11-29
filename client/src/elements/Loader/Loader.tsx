import React from 'react'
import styles from '../Loader/Loader.module.css'

function Loader() {
  return (
    <div className={styles.parent_loader}>
      <div className={styles.loader}>Loading...</div>
    </div>
  )
}

export default Loader;