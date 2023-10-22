import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import React, { SyntheticEvent } from 'react';

type Props = {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  label: string;
};

const AirportAutocomplete = ({ value, setValue, label }: Props) => {
  const [typingTimeout, setTypingTimeout] = React.useState<NodeJS.Timeout>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [airports, setAirports] = React.useState<string[]>([]);

  const fetchAirports = async (query: string) => {
    const response = await fetch(`/api/getAirportCodes?query=${query}`);
    const airportData = await response.json();
    setAirports(airportData);
  };

  React.useEffect(() => {
    fetchAirports('');
  }, []);

  const onInputChange = async (
    event: SyntheticEvent<Element, Event>,
    val: string,
  ) => {
    setLoading(true);
    event.preventDefault();
    setValue(val || null);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const newTimeout = setTimeout(() => {
      fetchAirports(val);
      setLoading(false);
    }, 500);
    setTypingTimeout(newTimeout);
  };

  return (
    <Autocomplete
      id="origin-airport"
      onInputChange={onInputChange}
      options={airports}
      value={value}
      loading={loading}
      freeSolo
      forcePopupIcon={true}
      renderOption={(props, option) => (
        <li {...props} key={option}>
          {option}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AirportAutocomplete;
