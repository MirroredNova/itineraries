import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import { typeToChunkMap } from '@/constants/maps';
import { Plan } from '@/types/plan.types';

type Props = {
  plan: Plan;
};

const PlanContainer = ({ plan }: Props) => (
  <Card className="flex flex-col w-1/2 h-fit">
    <CardContent className="flex flex-row justify-around">
      <h2>
        <b>Your Plan</b>
      </h2>
      <Button variant="contained" type="submit" className="w-fit bg-primary">
        Save
      </Button>
    </CardContent>
    <CardContent>
      {plan.chunks && plan.chunks.length > 0 && (
        <div className="flex flex-col gap-4">
          {plan.chunks.map((chunk, i) => {
            const ChunkComponent = typeToChunkMap.get(chunk.type);
            if (!ChunkComponent) return null;
            return <ChunkComponent key={i} chunkData={chunk.data} />;
          })}
        </div>
      )}
    </CardContent>
  </Card>
);

export default PlanContainer;
