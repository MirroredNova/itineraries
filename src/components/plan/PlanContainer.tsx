import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import { typeToChunkMap } from '@/constants/maps';
import { Plan } from '@/types/plan.types';
import { Box, Divider } from '@mui/material';

type Props = {
  plan: Plan;
};

const PlanContainer = ({ plan }: Props) => {
  const numberOfDays = parseInt(
    plan.configs
      .find((config) => config.type === 'Trip Length')
      ?.data.split(' ')[0] ?? '0',
    10,
  );

  return (
    <Card className="flex flex-col w-1/2 h-fit">
      <CardContent className="flex flex-row justify-around">
        <h2>
          <b>Your Plan</b>
        </h2>
        <Button variant="contained" type="submit" className="w-fit bg-primary">
          Save
        </Button>
      </CardContent>
      {/* <CardContent>
        {plan.chunks && plan.chunks.length > 0 && (
          <div className="flex flex-col gap-4">
            {plan.chunks.map((chunk, i) => {
              const ChunkComponent = typeToChunkMap.get(chunk.type);
              if (!ChunkComponent) return null;
              return <ChunkComponent key={i} chunkData={chunk.data} />;
            })}
          </div>
        )}
      </CardContent> */}
      {numberOfDays > 0 && (
        <CardContent className="flex flex-col justify-around gap-2">
          {Array.from({ length: numberOfDays }, (_, i) => i + 1).map((day) => (
            <div key={day} className="w-full">
              <div>Day {day}</div>
              <Divider />
              <Box height={40}></Box>
            </div>
          ))}
        </CardContent>
      )}
      <CardContent className="flex flex-row justify-around">
        <Button variant="contained" type="submit" className="w-fit bg-primary">
          Add Day
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlanContainer;
