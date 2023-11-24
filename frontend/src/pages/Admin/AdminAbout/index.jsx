import React from 'react'
import styles from './styles.module.scss'
export default function AdminAbout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.author}>
        <ul>
          <li>Author: Truyền Mai</li>
          <li>Contact: 079 834 123 9</li>
          <li>
            <a href="mailto:truyenmai95-thanhlapcongty@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
              Email: truyenmai95-thanhlapcongty@gmail.com
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.listItem}>
        <ul>
          Website Detail:
          <li> Version : 1.0.1 (last updated: 09/10/2023)</li>
          <li> Framework: Nodejs Reactjs Vitejs</li>
          <li> Node version: 18</li>
          <li> Express: 4.17</li>
          <li> React version: 17</li>
          <li> React Router: 6</li>
        </ul>
      </div>
    </div>
  )
}
