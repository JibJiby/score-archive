import { createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { firestore, storage } from '../firebase'

export const getScore = createAsyncThunk('score/getScore', async (scoreTitle: string, thunkAPI) => {
  try {
    // data <- scoreTitle
    // const scoreTitle = scoreTitle as unknown as string

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
