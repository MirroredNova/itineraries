import FlightChunk from '@/components/plan/chunks/FlightChunk';
import HotelChunk from '@/components/plan/chunks/HotelChunk';
import { ChunkMapType } from '@/types/chunks.types';

export const typeToChunkMap = new Map<string, ChunkMapType>([
  ['Flight', FlightChunk],
  ['Hotel', HotelChunk],
] as Array<[string, ChunkMapType]>);
