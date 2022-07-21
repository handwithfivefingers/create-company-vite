import React, { useCallback, useState, useEffect, useLayoutEffect, useRef, memo } from 'react';
import styles from './styles.module.scss';
import { isEqual } from 'lodash';
const VirtualScroll = (props) => {
  const [list, setList] = useState();

  const [visibleList, setVisibleList] = useState();

  const [scrollHeight, setScrollHeight] = useState(0);

  const [firstItem, setFirstItem] = useState(0);

  const itemRef = useRef();

  const containerRef = useRef();

  const anchorItem = useRef({ index: 0, offset: 0 });

  const lastScrollTop = useRef(0);

  const ELEMENT_HEIGHT = 22;

  const BUFFER_SIZE = useRef(3);
  
  let VISIBLE_COUNT = 0;

  useEffect(() => {
    setList(props.data);
    setVisibleList(props.data.slice(0, 30));
  }, [props]);

  const scroll = useCallback((event) => {
    const container = event.target;
    const delta = container.scrollTop - lastScrollTop.current;

    lastScrollTop.current = container.scrollTop;

    const isPositive = delta >= 0;
    anchorItem.current.offset += delta;
    // console.log(container, container.scrollTop, delta);
    // console.log(isPositive, anchorItem.current);

    let tempFirst = firstItem;

    tempFirst = Math.min(list.length - VISIBLE_COUNT, anchorItem.current.index - BUFFER_SIZE);
  
    console.log(firstItem, tempFirst, isPositive, list, VISIBLE_COUNT)
    updateAnchorItem(container);
    // if (isPositive) {
    //   if (anchorItem.current.offset >= ELEMENT_HEIGHT) {
    //     updateAnchorItem(container);
    //   }
    //   if (anchorItem.current.index - tempFirst >= BUFFER_SIZE) {
    //     tempFirst = Math.min(list.length - VISIBLE_COUNT, anchorItem.current.index - BUFFER_SIZE);
    //     setFirstItem(tempFirst);
    //   }
    // } else {
    //   // Roll up
    //   if (container.scrollTop <= 0) {
    //     anchorItem.current = { index: 0, offset: 0 };
    //   } else if (anchorItem.current.offset < 0) {
    //     updateAnchorItem(container);
    //   }
    //   // Has the updated index changed
    //   if (anchorItem.current.index - firstItem < BUFFER_SIZE) {
    //     tempFirst = Math.max(0, anchorItem.current.index - BUFFER_SIZE);
    //     setFirstItem(tempFirst);
    //   }
    // }
  
  }, [list, anchorItem]);

  const updateAnchorItem = useCallback((container) => {
    const index = Math.floor(container.scrollTop / ELEMENT_HEIGHT);
    const offset = container.scrollTop - ELEMENT_HEIGHT * index;
    anchorItem.current = {
      index,
      offset,
    };
  }, []);

  console.log('trigger render');

  return (
    <div onScroll={scroll} ref={containerRef} className={styles.container}>
      <div className={styles.sentry} style={{ transform: `translateY(${scrollHeight}px)` }}></div>

      {visibleList?.map((item, idx) => (
        <div key={idx} style={{ transform: `translateY(${item.scrollY}px)` }} className={styles.wrapItem} ind={idx}>
          <li ref={itemRef} item={item}>
            {item._id}
          </li>
        </div>
      ))}
    </div>
  );
};

export default memo(VirtualScroll, (a, b) => isEqual(a, b));

/**
 * Flow : Index of 20 first item;
 *
 *
 */
