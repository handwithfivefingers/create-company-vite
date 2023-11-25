import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
const Desc = (props) => {
  return (
    <div className={clsx(styles.descSection)}>
      <div className={clsx(styles.descSectionTitle)}>{props.title}</div>
      <div className={clsx(styles.descSectionContent)}>{props?.children}</div>
    </div>
  )
}

const DescItem = (props) => {
  // console.log('descitem', props)
  return (
    <div className={clsx(styles.descItem)}>
      <div className={clsx(styles.descItemLabel)}>
        {props.label}
        <span className={clsx(styles.descItemContent)}>{[props?.data]}</span>
      </div>
    </div>
  )
}

const DescListItem = (props) => {
  // console.log('DescListItem', props)
  return (
    <div className={clsx(styles.descListItem)}>
      <div className={clsx(styles.descListItemLabel)}>{props.title}</div>
      {[props?.children]}
    </div>
  )
}

// const Desc = (props) => {
//   return (
//     <div className={clsx(styles.descSection)}>
//       <div className={clsx(styles.descSectionTitle)}>{props.title}</div>
//       <div className={clsx(styles.descSectionContent)}>{props.children}</div>
//     </div>
//   );
// };

// const DescItem = (props) => {
//   return (
//     <div className={clsx(styles.descItem)}>
//       {props.list ? (
//         <div className={clsx(styles.descItemContent)}>
//           <span> {props.label} </span>: {props.children}
//         </div>
//       ) : (
//         <>
//           <div className={clsx(styles.descItemTitle)} />
//           <div className={clsx(styles.descItemLabel)}>{props.label}</div>
//           <p className={clsx(styles.descItemContent)}> {props.children} </p>
//         </>
//       )}
//     </div>
//   );
// };
// const DescListItem = '';

const CCDescription = {
  Desc,
  DescItem,
  DescListItem,
}

export default CCDescription
