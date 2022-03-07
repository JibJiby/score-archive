import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase'

// 전체 list를 가져옴.
const getScoreTitleList = async () => {
  const scoreCol = collection(firestore, 'score')
  const q = query(scoreCol, where('noSpaceTitle', '!=', ''))
  const snapshot = await getDocs(q)

  // 제목만
  const currentList = snapshot.docs.map((v) => v.data().title)
  //   console.log(currentList)

  return currentList
}

export default getScoreTitleList

// const plusCallback = async () => {
//  // 여기서 value는 useDocument(doc(firestore, 'search', 'core'), {
// //    snapshotListenOptions: { includeMetadataChanges: true },
// //})
//     const plusArray = [...value!.data()!.list]
//     plusArray.push('aaa')
//     await setDoc(doc(firestore, 'search', 'core'), {
//       list: plusArray,
//     })
//   }
