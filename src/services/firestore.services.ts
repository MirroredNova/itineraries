// import { getFirestore, setDoc, doc } from 'firebase/firestore';
// import app from '@/firebase/firebase';
// import { AirportReduced } from '@/constants/airports';

// const db = getFirestore(app);

// export const updateAirportData = async (data: AirportReduced[]) => {
//   data.forEach(async (airport) => {
//     await setDoc(doc(db, 'airports', airport.iata_code), airport);
//   });
// };
