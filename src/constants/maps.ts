import FlightChunk from '@/components/plan/chunks/FlightChunk';
import HotelChunk from '@/components/plan/chunks/HotelChunk';

type MapType = ({ chunkData }: { chunkData: object }) => React.JSX.Element;

export const typeToChunkMap = new Map<string, MapType>([
  ['Flight', FlightChunk],
  ['Hotel', HotelChunk],
] as Array<[string, MapType]>);
