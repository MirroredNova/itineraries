import React, { useCallback, useContext } from 'react';
import { PlanConfig } from '@/types/plan.types';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import { deleteConfig } from '@/services/realtime.services';
import { PlanDataContext } from '../providers/PlanDataProvider';

const Information = () => {
  const { planData, id, refreshData } = useContext(PlanDataContext);

  const handleDelete = useCallback(
    async (type: string) => {
      await deleteConfig(id, type);
      await refreshData();
    },
    [id, refreshData],
  );

  return (
    <Card className="text-center p-4">
      <h2>
        Unique Code: <b>{id}</b>
      </h2>
      <Divider className="my-2" />
      <List>
        {planData?.configs &&
          planData.configs.map((config: PlanConfig) => (
            <ListItem
              key={config.type}
              data-configtype={config.type}
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(config.type)}
                >
                  <ClearIcon />
                </IconButton>
              }
            >
              <ListItemText
                disableTypography
                primary={
                  <Typography>
                    <b>{`${config.type}: `}</b>
                    {`${config.data}`}
                  </Typography>
                }
              />
            </ListItem>
          ))}
      </List>
    </Card>
  );
};

export default Information;
