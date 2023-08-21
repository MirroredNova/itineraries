import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAS-lANG8DguglTyF2MJHfRgZ4b7GU2JVc',
  authDomain: 'itineraries-36463.firebaseapp.com',
  projectId: 'itineraries-36463',
  storageBucket: 'itineraries-36463.appspot.com',
  messagingSenderId: '529929450044',
  appId: '1:529929450044:web:45560b6caf71d016664939',
  databaseURL: 'https://itineraries-36463-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
