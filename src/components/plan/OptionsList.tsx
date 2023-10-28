import React, { Fragment, useMemo, useState } from 'react';
import Card from '@mui/material/Card';
import { categories } from '@/constants/forms';
import { Divider, List } from '@mui/material';
import OptionsListItem from './OptionsListItem';

const OptionsList = () => {
  const [activeSelection, setActiveSelection] = useState({
    categoryId: categories[0].id,
    optionId: categories[0].options[0].id,
  });

  const activeCategory = useMemo(
    () =>
      categories.find((category) => category.id === activeSelection.categoryId),
    [activeSelection],
  );

  const activeOption = useMemo(() => {
    if (!activeCategory) return null;
    return activeCategory.options.find(
      (option) => option.id === activeSelection.optionId,
    );
  }, [activeCategory, activeSelection]);

  return (
    <div className="flex flex-row gap-4">
      <Card className="w-fit min-w-fit h-fit">
        <List>
          {categories.map((category, i) => (
            <Fragment key={category.id}>
              <OptionsListItem
                category={category}
                setActiveSelection={setActiveSelection}
              />
              {i < categories.length - 1 && <Divider className="my-2" />}
            </Fragment>
          ))}
        </List>
      </Card>
      <Card className="p-4 grow h-fit">
        {activeOption && activeOption.form ? <activeOption.form /> : null}
      </Card>
    </div>
  );
};

export default OptionsList;
