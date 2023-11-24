import React, { useCallback, useState, useEffect, useLayoutEffect, useRef, memo, useMemo } from 'react'
import styles from './styles.module.scss'
import { isEqual } from 'lodash-es'
const VirtualScroll = (props) => {
  const [list, setList] = useState()

  const [visibleList, setVisibleList] = useState()

  const [scrollHeight, setScrollHeight] = useState(0)

  const [firstItem, setFirstItem] = useState(0)

  const scrollY = useRef(0)

  const itemRef = useRef()

  const containerRef = useRef()

  const anchorItem = useRef({ index: 0, offset: 0 })

  const lastScrollTop = useRef(0)

  const ELEMENT_HEIGHT = 22

  const BUFFER_SIZE = 3

  let VISIBLE_COUNT = 0

  useEffect(() => {
    setList(props.data)
    setVisibleList(props.data.slice(0, 30))
    setScrollHeight(ELEMENT_HEIGHT * props.data.length)
  }, [props])

  const scroll = useCallback(
    (event) => {
      const container = event.target
      const delta = container.scrollTop - lastScrollTop.current
      lastScrollTop.current = container.scrollTop
      const isPositive = delta >= 0
      anchorItem.current.offset += delta
      let tempFirst = firstItem
      tempFirst = Math.min(list.length - VISIBLE_COUNT, anchorItem.current.index - BUFFER_SIZE)
      updateAnchorItem(container)
    },
    [list, anchorItem],
  )

  const updateAnchorItem = useCallback(
    (container) => {
      const index = Math.floor(container.scrollTop / ELEMENT_HEIGHT)
      const offset = container.scrollTop - ELEMENT_HEIGHT * index
      anchorItem.current = {
        index,
        offset,
      }
      handleSetNewList()
    },
    [scrollHeight],
  )

  const handleSetNewList = () => {
    setVisibleList(props.data.slice(anchorItem.current.index, anchorItem.current.index + 30))
    scrollY.current =
      scrollY.current >= scrollHeight
        ? 23 * 22 - scrollHeight
        : anchorItem.current.index * ELEMENT_HEIGHT + anchorItem.current.offset
  }

  const visibleChildren = useMemo(
    () =>
      visibleList?.map((item, idx) => (
        <li ref={itemRef} item={item} key={item._id} ind={item._id}>
          {item._id}
        </li>
      )),
    [visibleList, scrollY],
  )

  // console.log('trigger render');

  return (
    <div onScroll={scroll} ref={containerRef} className={styles.container}>
      <div className={styles.sentry} style={{ transform: `translateY(${scrollY.current}px)` }}></div>
      <div style={{ transform: `translateY(${scrollY.current}px)`, height: scrollHeight }} className={styles.wrapItem}>
        {visibleChildren}
      </div>
    </div>
  )
}

export default memo(VirtualScroll, (a, b) => isEqual(a, b))

/**
 * Flow : Index of 20 first item;
 *
 *
 */
