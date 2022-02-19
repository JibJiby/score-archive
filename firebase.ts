import * as firebase from 'firebase/app'
//https://stackoverflow.com/questions/59050195/uncaught-typeerror-cannot-read-property-initializeapp-of-undefined
import { getFirestore, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  // firebase 설정과 관련된 개인 정보
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig)

// firebase의 firestore 인스턴스를 변수에 저장
// const firestore = firebase.getApp()

// 필요한 곳에서 사용할 수 있도록 내보내기
// export { firestore }

export const firestore = getFirestore()
export const storage = getStorage()
