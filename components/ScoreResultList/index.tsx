import React from 'react'
import { RootState } from '@reducers/index'
import { Image } from 'antd'
import { useSelector } from 'react-redux'
import BackTop from '@components/BackTop'

const ScoreResultList = () => {
  const result = useSelector<RootState>((state) => state.score.result) as string[]

  // console.log('result')
  // console.log(result)

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '3rem 2rem',
        }}
      >
        {result?.map((v) => (
          <Image src={v} preview={false} key={v} />
        ))}
      </div>
      <BackTop />
    </>
  )
}

export default ScoreResultList
