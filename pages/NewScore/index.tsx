import React, { useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '@components/AppLayout'
import useInput from '@hooks/useInput'
import { Image, message } from 'antd'
import { useUploadFile } from 'react-firebase-hooks/storage'
import { useNavigate } from 'react-router-dom'
import scoreSlice, { ScoreState } from '@reducers/score'
import { FileUploadWrapper, NewScoreInput, SecondTitleInput } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { addScore, getScore, addSecondScore } from '@actions/score'
import { RootState } from '@reducers/index'
import { Divider } from './styles'

const NewScore = () => {
  const [fileType, setFileType] = useState('')
  const [selectedFile, setSelectedFile] = useState<File>()
  const [localFileUrl, setLocalFileUrl] = useState('')
  const [newScoreTitle, onChangeScoreTitle] = useInput('')
  const [newSecondScoreTitle, onChangeSecondScoreTitle, setNewSecondScoreTitle] = useInput('')
  const { addScoreDone, addScoreError } = useSelector<RootState, ScoreState>((state) => state.score)
  const { result, loadScoreError } = useSelector<RootState, ScoreState>((state) => state.score)
  const uploadRef = useRef<HTMLInputElement>(null)
  const checkBtnRef = useRef<HTMLButtonElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)

  const [uploadFile] = useUploadFile()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!result) {
      // 이미 result에 값이 있다면
      // ex)  검색하다가 '추가'로 넘어오면
      dispatch(scoreSlice.actions.resetResult())
    }
  }, [])

  useEffect(() => {
    if (newScoreTitle && result) {
      titleInputRef?.current?.blur()
      message.info('같은 제목으로 이미 등록되어 있습니다.', 0.8)
    }
  }, [newScoreTitle, result])

  useEffect(() => {
    if (addScoreDone) {
      navigate('/')
      message.success('업로드 완료했습니다', 0.5)
    } else if (addScoreError) {
      message.warn('업로드 중 에러가 발생했습니다.')
    }
  }, [addScoreDone])

  useEffect(() => {
    if (!selectedFile && uploadRef.current) {
      // 여기서 uploadRef 초기화
      uploadRef.current.value = ''
    }
  }, [selectedFile, uploadRef])

  const onUpload = useCallback(async () => {
    if (newScoreTitle === '') {
      message.warn('제목을 먼저 입력해주세요.')
      return
    }

    if (selectedFile) {
      if (newSecondScoreTitle) {
        dispatch(addSecondScore({ selectedFile, newSecondScoreTitle, newScoreTitle, fileType, uploadFile }))
      } else {
        // 추가 제목 없을 때
        dispatch(addScore({ selectedFile, newScoreTitle, fileType, uploadFile }))
      }
    } else {
      message.warn('선택된 파일이 없습니다.')
    }
  }, [navigate, selectedFile, newScoreTitle, fileType, uploadFile])

  const onCheckClick = useCallback(() => {
    if (newScoreTitle === '') {
      message.warn('제목을 먼저 입력해주세요.')
      return
    }
    dispatch(getScore(newScoreTitle))
  }, [newScoreTitle])

  return (
    <AppLayout>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          marginTop: '4.5rem',
          // justifyContent: 'center',
          flexDirection: 'column',
          alignContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <NewScoreInput
            ref={titleInputRef}
            value={newScoreTitle}
            onChange={onChangeScoreTitle}
            placeholder={'생성할 악보 제목을 입력해주세요.'}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                if (checkBtnRef.current) checkBtnRef.current.click()
              }
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#adb5bd',
              // 너비
              width: '45%',
              minWidth: '250px',
              borderRadius: '4px',
              minHeight: '60px',
              userSelect: 'none',
            }}
          >
            <span
              style={{
                fontWeight: 600,
                paddingBottom: '10px',
              }}
            >
              이미 등록된 지 확인해주세요!
            </span>
            <button onClick={onCheckClick} ref={checkBtnRef} style={{ margin: '10px auto' }}>
              확인
            </button>
          </div>
        </div>

        <div
          style={{
            display: result ? 'flex' : 'none',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '20px',
          }}
        >
          {result && (
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
          <Divider />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '25px',
          }}
        >
          {selectedFile ? (
            <Image src={localFileUrl} />
          ) : (
            <FileUploadWrapper
              onClick={() => {
                if (uploadRef.current) uploadRef.current.click()
              }}
            >
              <span role="button" tabIndex={0}>
                <input
                  type="file"
                  accept="image/jpg,impge/png,image/jpeg,image/gif"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : undefined
                    if (file) {
                      //https://gaemi606.tistory.com/39
                      let reader = new FileReader()
                      reader.readAsDataURL(file)
                      reader.onloadend = () => {
                        setLocalFileUrl(reader.result as string)
                      }

                      setFileType(file.type)
                      setSelectedFile(file)
                    }
                  }}
                  ref={uploadRef}
                  style={{ display: 'none' }}
                />
                <div>
                  {/* TODO: 플러스 아이콘 추가 */}
                  <div style={{ marginTop: '8px', fontWeight: 700 }}>업로드</div>
                </div>
              </span>
            </FileUploadWrapper>
          )}
        </div>
        {selectedFile && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => {
                if (selectedFile) {
                  setFileType('')
                  setSelectedFile(undefined)
                  setLocalFileUrl('')
                  // 두번째 제목도 초기화
                  setNewSecondScoreTitle('')
                }
              }}
            >
              초기화
            </button>
          </div>
        )}
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {selectedFile && (
            <SecondTitleInput
              value={newSecondScoreTitle}
              onChange={onChangeSecondScoreTitle}
              placeholder="추가할 제목을 입력해주세요."
            />
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={onUpload}
            // TODO: ScoreSearch 스타일 묶기
            style={{
              width: '200px',
              height: '2.5rem',
              margin: '50px auto',
              border: 0,
              borderRadius: '6px',
              fontSize: '20px',
              backgroundColor: '#001C34',
              color: 'white',
              fontWeight: 'bold',
              userSelect: 'none',
              cursor: 'pointer',
              transition: 'all 0.5s',
            }}
          >
            추가
          </button>
        </div>
      </div>
    </AppLayout>
  )
}

export default NewScore
