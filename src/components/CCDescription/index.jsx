import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
const Desc = (props) => {
  return (
    <div className={clsx(styles.descSection)}>
      <div className={clsx(styles.descSectionTitle)}>{props.title}</div>
      <div className={clsx(styles.descSectionContent)}>{props.children}</div>
    </div>
  );
};

const DescItem = (props) => {
  return (
    <div className={clsx(styles.descItem)}>
      {props.list ? (
        <div className={clsx(styles.descItemContent)}>
          <span> {props.label} </span>: {props.children}
        </div>
      ) : (
        <>
          <div className={clsx(styles.descItemTitle)} />
          <div className={clsx(styles.descItemLabel)}>{props.label}</div>
          <p className={clsx(styles.descItemContent)}> {props.children} </p>
        </>
      )}
    </div>
  );
};

const DescListItem = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { list: true });
    }
    return child;
  });
  return (
    <div className={clsx(styles.descListItem)}>
      <div className={clsx(styles.descListItemLabel)}>{props.title}</div>
      {childrenWithProps}
    </div>
  );
};

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
};

export default CCDescription
