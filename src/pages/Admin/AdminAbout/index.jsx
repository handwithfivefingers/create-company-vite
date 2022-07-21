import React from 'react';
import styles from './styles.module.scss';
export default function AdminAbout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.author}>
        <ul>
          <li>Author: Truyền Mai</li>
          <li>Contact: 079 834 123 9</li>
        </ul>
      </div>
      <div className={styles.listItem}>
        <ul>
          Website Detail:
          <li> Version : 0.4 (last updated: 30/06/2022)</li>
          <li> Framework: Nodejs Reactjs</li>
          <li> Node version: 16</li>
          <li> Express: 4.17</li>
          <li> React version: 17</li>
          <li> React Router: 6</li>
        </ul>
      </div>
    </div>
  );
}
