import React from 'react'
import { RootState } from '@reducers/index'
import { Image, Spin } from 'antd'
import { useSelector } from 'react-redux'
import BackTop from '@components/BackTop'
import Spinner from '@components/Spinner'
import MyImage from '@components/MyImage'

const ScoreResultList = () => {
  // https://stackoverflow.com/questions/57472105/react-redux-useselector-typescript-type-for-state
  // unknown 문제
  const result = useSelector<RootState, string[] | null>((state) => state.score.result)
  const loadScoreLoading = useSelector<RootState, boolean>((state) => state.score.loadScoreLoading)

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
              <MyImage src={v} key={v} />
            ))}
          </>
        )}
      </div>
      <BackTop />
    </>
  )
}

export default ScoreResultList
