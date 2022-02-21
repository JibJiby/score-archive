import React, { useCallback, useState } from 'react'
import AppLayout from '@components/AppLayout'
import useInput from '@hooks/useInput'
import { inputStyle } from '@styles/common'
import convertConsonant from '@utils/convertContanent'
import { message } from 'antd'
import { useUploadFile } from 'react-firebase-hooks/storage'
import { firestore, storage } from '../../firebase'
import { ref } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const NewScore = () => {
  const [newScoreTitle, onChangeScoreTitle, setNewScoreTitle] = useInput('')
  const [fileType, setFileType] = useState('')
  const [selectedFile, setSelectedFile] = useState<File>()

  const [uploadFile, uploading, snapshot, error] = useUploadFile()
  const navigate = useNavigate()

  // console.log('-'.repeat(50))
  // console.log(newScoreTitle)
  // console.log(fileType)
  // console.log('-'.repeat(50))

  const onUpload = useCallback(async () => {
    if (selectedFile) {
      // storage
      const encodedName = encodeURI(newScoreTitle)
      const newFileHref = `images/${encodedName}.${fileType.split('/')[1]}`
      const newFileRef = ref(storage, newFileHref)
      await uploadFile(newFileRef, selectedFile, {
        contentType: fileType,
      })

      //firebase.google.com/docs/firestore/manage-data/add-data?hl=ko
      const newDocRef = await addDoc(collection(firestore, 'score'), {
        title: newScoreTitle,
        href: newFileHref,
        consonant: [convertConsonant(newScoreTitle)],
      })

      // console.log('-'.repeat(50))
      // console.log({
      //   title: newScoreTitle,
      //   href: newFileHref,
      //   consonant: [convertConsonant(newScoreTitle)],
      // })
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
          justifyContent: 'center',
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
          <label>제목</label>
          <input value={newScoreTitle} onChange={onChangeScoreTitle} css={inputStyle} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : undefined
              if (file) {
                setFileType(file.type)
                setSelectedFile(file)
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
          <button onClick={onUpload}>추가</button>
        </div>
      </div>
    </AppLayout>
  )
}

export default NewScore
