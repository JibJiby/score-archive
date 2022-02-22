import React from 'react'
import { RootState } from '@reducers/index'
import { Image, Spin } from 'antd'
import { useSelector } from 'react-redux'
import BackTop from '@components/BackTop'
import Spinner from '@components/Spinner'

const ScoreResultList = () => {
  // https://stackoverflow.com/questions/57472105/react-redux-useselector-typescript-type-for-state
  // unknown 문제
  const result = useSelector<RootState, string[] | null>((state) => state.score.result)
  const loadScoreLoading = useSelector<RootState, boolean>((state) => state.score.loadScoreLoading)

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
          alignItems: 'center',
          padding: '3rem 2rem',
        }}
      >
        {loadScoreLoading ? (
          <Spinner />
        ) : (
          <>
            {result?.map((v) => (
              <Image
                src={v}
                preview={false}
                key={v}
                style={{
                  margin: '20px auto',
                }}
              />
            ))}
          </>
        )}
      </div>
      <BackTop />
    </>
  )
}

export default ScoreResultList
