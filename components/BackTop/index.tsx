import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

// 클래스
//https://salgum1114.github.io/reactjs/2019-04-25-back-top-component/

// 함수형
// https://www.geeksforgeeks.org/how-to-create-a-scroll-to-top-button-in-react-js/
const BackTop = () => {
  const [visible, setVisible] = useState(false)
  const scrollLimit = useRef(50)

  useEffect(() => {
    // 이벤트 등록 한번만
    // FIXME: 마운트 될 때마다 추가됨
    window.addEventListener('scroll', toggleVisible)
  }, [])

  const toggleVisible = () => {
    //https://stackoverflow.com/questions/2863
    const scrolled = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    // console.log('scrolled')
    // console.log(scrolled)

    if (scrolled > scrollLimit.current) {
      setVisible(true)
    } else if (scrolled <= scrollLimit.current) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div
      style={{
        position: 'fixed',
        // width: '100%',
        right: '1rem',
        bottom: '40px',
        // height: '20px',
        fontSize: '2rem',
        zIndex: '1',
        display: visible ? 'inline' : 'none',
        backgroundColor: 'tomato',
        cursor: 'pointer',
      }}
      onClick={scrollToTop}
    >
      UP
    </div>
  )
}

export default BackTop
