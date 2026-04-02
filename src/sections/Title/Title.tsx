"use client"

import React from 'react'
import styles from './Title.module.scss'

export const Title = () => {
  return (
    <section>
        <h1 className={styles.mainTitle}>Днешно Меню</h1>
        <h3 className={styles.subTitle}>Пссст… още е горещо!</h3>
    </section>
  )
}
