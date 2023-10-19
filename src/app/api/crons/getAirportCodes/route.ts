// /* eslint-disable @typescript-eslint/naming-convention */
// import { AirportReduced, Airports } from '@/constants/airports';
// import { updateAirportData } from '@/services/firestore.services';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const res = await fetch(
//     'https://airlabs.co/api/v9/airports?api_key=9e4876b2-dddb-4aca-b86d-923c072503f1',
//     {
//       cache: 'no-store',
//     },
//   );
//   const data = (await res.json()).response as Airports[];

//   const filteredData: AirportReduced[] = data.reduce<AirportReduced[]>(
//     (result, airport) => {
//       const { iata_code, name, country_code } = airport;
//       if (iata_code && name && country_code) {
//         const searchString = `${iata_code} - ${name} (${country_code})`;
//         result.push({ iata_code, name, country_code, searchString });
//       }
//       return result;
//     },
//     [],
//   );

//   await updateAirportData(filteredData);
//   return NextResponse.json({ status: 200 });
// }
