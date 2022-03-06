import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import AppLayout from '@components/AppLayout'
import ScoreSearch from '@components/ScoreSearch'
import ScoreResultList from '@components/ScoreResultList'
import { doc, setDoc, query, getDocs, collection, where, getDoc } from 'firebase/firestore'
import { firestore } from '../../firebase'

const Home = () => {
  const [value, loading, error] = useDocument(doc(firestore, 'search', 'core'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  console.log('-'.repeat(50))
  // console.log(value)
  console.log(value?.data())
  console.log('-'.repeat(50))

  // 추가하는 cb
  const plusCallback = async () => {
    const plusArray = [...value!.data()!.list]
    plusArray.push('aaa')
    await setDoc(doc(firestore, 'search', 'core'), {
      list: plusArray,
    })
  }

  // 전체 리스트 가져오는 cb
  const queryCb = async () => {
    const scoreCol = collection(firestore, 'score')
    const q = query(scoreCol, where('noSpaceTitle', '!=', ''))
    const snapshot = await getDocs(q)

    console.log(snapshot.docs.map((v) => v.data().title))
  }

  return (
    <>
      <AppLayout>
        <ScoreSearch />
        <ScoreResultList />
        {/* <button onClick={queryCb}>bbb</button> */}
      </AppLayout>
    </>
  )
}
export default Home
