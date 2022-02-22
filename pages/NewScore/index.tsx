import React, { useCallback, useRef, useState } from 'react'
import AppLayout from '@components/AppLayout'
import useInput from '@hooks/useInput'
import convertConsonant from '@utils/convertContanent'
import { Image, message } from 'antd'
import { useUploadFile } from 'react-firebase-hooks/storage'
import { firestore, storage } from '../../firebase'
import { ref } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { QueryResult } from '@reducers/score'
import { FileUploadWrapper, NewScoreInput } from './styles'

const NewScore = () => {
  const [newScoreTitle, onChangeScoreTitle] = useInput('')
  const [fileType, setFileType] = useState('')
  const [selectedFile, setSelectedFile] = useState<File>()
  const [localFileUrl, setLocalFileUrl] = useState('')
  const uploadRef = useRef<HTMLInputElement>(null)

  // TODO: uploading 스피너 적용
  const [uploadFile] = useUploadFile()
  const navigate = useNavigate()

  const onUpload = useCallback(async () => {
    if (newScoreTitle === '') {
      message.warn('제목을 먼저 입력해주세요.')
      return
    }

    if (selectedFile) {
      // storage
      const encodedName = encodeURI(newScoreTitle)
      const newFileHref = `images/${encodedName}.${fileType.split('/')[1]}`
      const newFileRef = ref(storage, newFileHref)
      await uploadFile(newFileRef, selectedFile, {
        contentType: fileType,
      })

      //firebase.google.com/docs/firestore/manage-data/add-data?hl=ko
      const newFileInfo: QueryResult = {
        title: newScoreTitle,
        href: newFileHref,
        consonant: [convertConsonant(newScoreTitle)],
      }
      const newDocRef = await addDoc(collection(firestore, 'score'), newFileInfo)

      // console.log('-'.repeat(50))
      // console.log(newFileInfo)
      // console.log('-'.repeat(50))

      navigate('/')
      message.success('업로드 완료했습니다', 0.5)
    } else {
      message.warn('선택된 파일이 없습니다.')
    }
  }, [navigate, selectedFile])

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
            value={newScoreTitle}
            onChange={onChangeScoreTitle}
            placeholder={'악보 제목을 입력해주세요.'}
          />
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
                  <div style={{ marginTop: '8px', fontWeight: 700 }}>업로드</div>
                </div>
              </span>
            </FileUploadWrapper>
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
