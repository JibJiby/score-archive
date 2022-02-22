import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import AppLayout from '@components/AppLayout'
import ScoreSearch from '@components/ScoreSearch'
import ScoreResultList from '@components/ScoreResultList'
import { doc } from 'firebase/firestore'
import { firestore } from '../../firebase'

const Home = () => {
  // const [value, loading, error] = useDocument(doc(firestore, 'list', 'root'), {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // })

  // console.log('-'.repeat(50))
  // // console.log(value)
  // console.log(value?.data())
  // console.log('-'.repeat(50))

  return (
    <>
      <AppLayout>
        <ScoreSearch />
        <ScoreResultList />
      </AppLayout>
    </>
  )
}
export default Home
