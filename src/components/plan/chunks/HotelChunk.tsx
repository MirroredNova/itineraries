import React from 'react';
import Chunk from '@/components/shared/Chunk';
import { HotelChunkType } from '@/types/chunks.types';

type Props = {
  chunkData: HotelChunkType;
};

const HotelChunk = ({ chunkData }: Props) => (
  <Chunk summaryText={`Hotel: ${chunkData.hotelName}`}>
    <p>Hotel Name: {chunkData.hotelName}</p>
    <p>Check In Time: {chunkData.dayFields.checkIn.time}</p>
    <p>Check Out Time: {chunkData.dayFields.checkOut.time}</p>
  </Chunk>
);

export default HotelChunk;
