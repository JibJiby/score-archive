import React from 'react'
import { RootState } from '@reducers/index'
import scoreSlice, { ScoreState } from '@reducers/score'
import { Image, message } from 'antd'
import JSZip from 'jszip'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveAs } from 'file-saver'

const Download = () => {
  const { basket } = useSelector<RootState, ScoreState>((state) => state.score)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getImgBlob = async (href: string) => {
    const response = await fetch(href)
    const data = await response.blob() // Blob
    return data
  }

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
          <>
            <div>
              <button
                onClick={() => {
                  navigate('/')
                }}
              >
                더 추가하러 가기
              </button>
            </div>
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
                onClick={async () => {
                  //TODO: url 가지고 blob 객체 만들어서 결과로 압축 파일 다운로드하게.
                  //https://velog.io/@ordidxzero/Image-URL%EC%9D%84-File-object%EB%A1%9C-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0
                  // https://stove99.github.io/etc/2021/06/09/firebase-storage-cors-setting/
                  try {
                    const result = await Promise.all(basket.map((v) => getImgBlob(v.href)))
                    console.log('result')
                    console.log(result)

                    const zip = new JSZip()
                    const imgFolder = zip.folder('images')
                    // // imgFolder?.file(`${}.jpeg`, null)

                    basket.forEach((v) => {
                      imgFolder?.file(`${v.id}.jpeg`)
                    })
                    result.forEach((blob, i) => {
                      imgFolder?.file(`${i}.${blob.type.split('/')[1]}`, blob)
                    })
                    const zipFile = await imgFolder?.generateAsync({ type: 'blob' }) // 압축 파일 생성
                    if (zipFile) {
                      saveAs(zipFile, 'images.zip')
                    } else {
                      console.error('zipFile XXX')
                    }
                  } catch (e) {
                    console.log(e)
                    message.warn('다운로드 중 오류가 발생했습니다.', 0.8)
                  }
                }}
              >
                다운로드
              </div>
            </div>
          </>
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
                key={v.href}
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
