import { ListItemButton, ListItemText, Collapse, List } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Category } from '@/types/form.types';

type Props = {
  category: Category;
  setActiveSelection: Dispatch<
    SetStateAction<{
      categoryId: string;
      optionId: string;
    }>
  >;
};

const OptionsListItem = ({ category, setActiveSelection }: Props) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} key={category.id}>
        <ListItemText
          primary={category.headerLabel}
          className="pr-4 font-bold text-xl"
          disableTypography
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {category.options.map((option) => (
            <ListItemButton
              key={option.id}
              className="pl-6 p-0"
              disableGutters
              onClick={() => {
                setActiveSelection({
                  categoryId: category.id,
                  optionId: option.id,
                });
              }}
            >
              <ListItemText
                primary={option.accordionLabel}
                disableTypography
                className="text-base"
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default OptionsListItem;
