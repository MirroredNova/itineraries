import React from 'react';
import Chunk from '@/components/shared/Chunk';
import { HotelChunkType } from '@/types/chunks.types';

type Props = {
  chunkData: HotelChunkType;
};

const HotelChunk = ({ chunkData }: Props) => (
  <Chunk summaryText="Hotel">
    <p>Hotel Name: {chunkData.hotelName}</p>
    <p>Check In Date: {chunkData.checkInDate}</p>
    <p>Check Out Date: {chunkData.checkOutDate}</p>
  </Chunk>
);

export default HotelChunk;
