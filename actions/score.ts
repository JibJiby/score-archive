import { QueryResult } from '@reducers/score'
import { createAsyncThunk } from '@reduxjs/toolkit'
import convertConsonant from '@utils/convertContanent'
import { message } from 'antd'
import { addDoc, collection, getDocs, query, where, doc } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { firestore, storage } from '../firebase'

export const getScore = createAsyncThunk('score/getScore', async (scoreTitle: string, thunkAPI) => {
  try {
    const scoreCol = collection(firestore, 'score')
    const q = query(scoreCol, where('noSpaceTitle', '==', scoreTitle.replace(/\s/g, '')))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      // UI 로직은 빼야하는게 나을 듯??
      message.warn('검색 결과가 없습니다!', 0.7)
      // dispatch(scoreSlice.actions.setResult(null))
      return null // ???
    } else {
      let resultHrefList: Array<string>
      resultHrefList = await Promise.all(
        snapshot.docs.map(async (v) => {
          let resultHref = v.data().href
          const url = await getDownloadURL(ref(storage, resultHref))
          return url
        }),
      )

      return resultHrefList
    }
  } catch (error) {
    message.warn('url이 유효하지 않습니다.')
    console.error(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const addScore = createAsyncThunk(
  'score/addScore',
  async (
    data: {
      selectedFile: File
      newScoreTitle: string
      fileType: string
      // TODO: 타입 올바르게 넣기
      uploadFile: any
    },
    ThunkAPI,
  ) => {
    const { newScoreTitle, fileType, selectedFile, uploadFile } = data

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
      noSpaceTitle: newScoreTitle.replace(/\s/g, ''),
    }
    const newDocRef = await addDoc(collection(firestore, 'score'), newFileInfo)
  },
)

// 첫등록 + 추가제목도
export const addSecondScore = createAsyncThunk(
  'score/addSecondScore',
  async (
    data: {
      selectedFile: File
      newScoreTitle: string
      // 추가한 제목
      newSecondScoreTitle: string
      fileType: string
      // TODO: 타입 올바르게 넣기
      uploadFile: any
    },
    ThunkAPI,
  ) => {
    const { newScoreTitle, newSecondScoreTitle, fileType, selectedFile, uploadFile } = data

    const encodedName = encodeURI(newScoreTitle)
    const newFileHref = `images/${encodedName}.${fileType.split('/')[1]}`
    const newFileRef = ref(storage, newFileHref)
    await uploadFile(newFileRef, selectedFile, {
      contentType: fileType,
    })
    // 성공하면 계속 진행

    const newFileInfo: QueryResult = {
      title: newScoreTitle,
      href: newFileHref,
      consonant: [convertConsonant(newScoreTitle)],
      noSpaceTitle: newScoreTitle.replace(/\s/g, ''),
    }
    const newDocRef = await addDoc(collection(firestore, 'score'), newFileInfo)

    // 두번째 (우선 첫번째 성공시키고)
    const newSecondInfo: QueryResult = {
      title: newSecondScoreTitle,
      href: newFileHref, // 여기 이미지 주소만 동일하게
      consonant: [convertConsonant(newSecondScoreTitle)],
      noSpaceTitle: newSecondScoreTitle.replace(/\s/g, ''),
    }
    const newSecondDocRef = await addDoc(collection(firestore, 'score'), newSecondInfo)
  },
)
