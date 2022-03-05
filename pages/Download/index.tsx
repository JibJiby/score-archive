import { RootState } from '@reducers/index'
import scoreSlice, { ScoreState } from '@reducers/score'
import { Image } from 'antd'
import JSZip from 'jszip'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Download = () => {
  const { basket } = useSelector<RootState, ScoreState>((state) => state.score)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
        {basket && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
            <div
              style={{
                backgroundColor: '#0c243b',
                minWidth: '150px',
                width: '100%',
                display: 'block',
                borderRadius: '6px',
                border: 'solid 1px rgba(0,0,0,.15)',
                cursor: 'pointer',
                padding: '20px auto',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
                textAlign: 'center',
              }}
              onClick={() => {
                const zip = new JSZip()

                const imgFolder = zip.folder('images')
                // imgFolder?.file(`${}.jpeg`, null)
                basket.forEach((v) => {
                  imgFolder?.file(`${v.id}.jpeg`, null)
                })

                let promise: any = null
                if (JSZip.support.uint8array) {
                  promise = zip.generateAsync({ type: 'uint8array' })
                } else {
                  promise = zip.generateAsync({ type: 'string' })
                }

                //TODO: url 가지고 blob 객체 만들어서 결과로 압축 파일 다운로드하게.
              }}
            >
              다운로드
            </div>
          </div>
        )}

        <>
          {basket ? (
            basket?.map((v) => (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  margin: '10px auto',
                }}
              >
                <Image
                  src={v.href}
                  preview={false}
                  key={v.href}
                  style={{
                    margin: '20px auto',
                  }}
                />
                <button
                  onClick={() => {
                    dispatch(scoreSlice.actions.removeBasket(v.href))
                  }}
                >
                  빼기
                </button>
              </div>
            ))
          ) : (
            <div style={{ userSelect: 'none', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              비어 있습니다.
              <button onClick={() => navigate('/')}>돌아가기</button>
            </div>
          )}
        </>
      </div>
    </>
  )
}

export default Download
