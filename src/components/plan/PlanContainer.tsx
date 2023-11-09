import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useCallback, useContext } from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';
import { updateDays } from '@/services/realtime.services';
import { typeToChunkMap } from '@/constants/maps';
import { PlanDataContext } from '../providers/PlanDataProvider';

const PlanContainer = () => {
  const { id, plan } = useContext(PlanDataContext);

  const handleAddDay = useCallback(async () => {
    await updateDays(id);
  }, [id]);

  const handleDeleteDay = useCallback(
    async (dayIndex: number) => {
      await updateDays(id, dayIndex);
    },
    [id],
  );

  const renderDayText = useCallback((index: number) => {
    if (index === 0) {
      return 'Unassigned Items';
    }
    return `Day ${index}`;
  }, []);

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
      <CardContent className="flex flex-col justify-around gap-2">
        <List>
          {plan?.days &&
            plan?.days.map((day, index) => (
              <ListItem key={index} className="flex flex-col gap-1">
                <div className="flex flex-row w-full">
                  <ListItemText
                    primary={renderDayText(index)}
                    className="flex items-center"
                  />
                  {index !== 0 && (
                    <ListItemIcon>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteDay(index)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </ListItemIcon>
                  )}
                </div>
                <Divider className="w-full" />
                {!day.chunks || day.chunks.length === 0 ? (
                  <ListItemText
                    primary="No items in this day yet."
                    className="flex items-center"
                  />
                ) : (
                  <Box width="100%">
                    {day.chunks &&
                      day.chunks.map((chunk, i) => {
                        const ChunkComponent = typeToChunkMap.get(chunk.type);
                        if (!ChunkComponent) return null;
                        return (
                          <ChunkComponent key={i} chunkData={chunk.data} />
                        );
                      })}
                  </Box>
                )}
              </ListItem>
            ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PlanContainer;
