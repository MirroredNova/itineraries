import React from 'react';

type HotelChunkType = {
  checkInDate: string;
  checkOutDate: string;
  hotelName: string;
};

const HotelChunk = ({ chunkData }: { chunkData: HotelChunkType }) => (
  <div>
    <h1>Hotel</h1>
    <p>Hotel Name: {chunkData.hotelName}</p>
    <p>Check In Date: {chunkData.checkInDate}</p>
    <p>Check Out Date: {chunkData.checkOutDate}</p>
  </div>
);

export default HotelChunk;
