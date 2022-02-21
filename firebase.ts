import * as firebase from 'firebase/app'
//https://stackoverflow.com/questions/59050195/uncaught-typeerror-cannot-read-property-initializeapp-of-undefined
import { getFirestore, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

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

// 이 파일에서 initialize 해서 아래 export 의미 있음
// initialize 안하고 get() 의미 없음
export const firestore = getFirestore()
export const storage = getStorage()
export const auth = getAuth()
