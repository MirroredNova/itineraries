import Chunk from '@/components/shared/Chunk';
import React from 'react';

type HotelChunkType = {
  checkInDate: string;
  checkOutDate: string;
  hotelName: string;
};

const HotelChunk = ({ chunkData }: { chunkData: HotelChunkType }) => (
  <Chunk summaryText="Hotel">
    <p>Hotel Name: {chunkData.hotelName}</p>
    <p>Check In Date: {chunkData.checkInDate}</p>
    <p>Check Out Date: {chunkData.checkOutDate}</p>
  </Chunk>
);

export default HotelChunk;
