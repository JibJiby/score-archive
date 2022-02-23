import React, { useEffect } from 'react'
import Header from './Header'

const AppLayout: React.FC = ({ children }) => {
  useEffect(() => {
    // 새로고침 시 상단으로 화면 올리기
    // react-beforeunload 라이브러리도 있음
    // FIXME: 스마트폰은 안됨
    window.onbeforeunload = function () {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <>
      <Header />
      <div style={{ width: '100%' }}>{children}</div>
    </>
  )
}

export default AppLayout
