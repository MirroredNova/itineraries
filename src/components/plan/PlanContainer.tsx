import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useContext } from 'react';
// import { typeToChunkMap } from '@/constants/maps';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { updateConfig } from '@/services/realtime.services';
import { ClearIcon } from '@mui/x-date-pickers';
import { PlanDataContext } from '../providers/PlanDataProvider';

const PlanContainer = () => {
  const { planData, id, refreshData } = useContext(PlanDataContext);

  const handleAddDay = async () => {
    if (!planData) return;

    const tripLengthConfig = planData?.configs.find(
      (config) => config.type === 'Trip Length',
    );
    const currentDays = parseInt(
      tripLengthConfig?.data.split(' ')[0] ?? '0',
      10,
    );
    const updatedDays = currentDays + 1;
    await updateConfig(id, 'Trip Length', `${updatedDays} days`);
    await refreshData();
  };

  const numberOfDays = parseInt(
    planData?.configs
      ?.find((config) => config.type === 'Trip Length')
      ?.data.split(' ')[0] ?? '0',
    10,
  );

  return (
    <Card className="flex flex-col w-1/2 h-fit">
      <CardContent className="flex flex-row justify-around">
        <h2>
          <b>Your Plan</b>
        </h2>
        <Button
          variant="contained"
          type="submit"
          className="w-fit bg-primary"
          onClick={handleAddDay}
        >
          Add Day
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
          <List>
            {Array.from({ length: numberOfDays }, (_, i) => i + 1).map(
              (day) => (
                <ListItem key={day} className="flex flex-col gap-1">
                  <div className="flex flex-row w-full">
                    <ListItemText
                      primary={`Day ${day}`}
                      className="flex items-center"
                    />
                    <ListItemIcon>
                      <IconButton aria-label="delete">
                        <ClearIcon />
                      </IconButton>
                    </ListItemIcon>
                  </div>
                  <Divider className="w-full" />
                  <Box height={35}></Box>
                </ListItem>
              ),
            )}
          </List>
        </CardContent>
      )}
    </Card>
  );
};

export default PlanContainer;
