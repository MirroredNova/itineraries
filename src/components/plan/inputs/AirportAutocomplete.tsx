import { AirportLocal } from '@/constants/airports';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Props = {
  value: AirportLocal | null;
  setValue: React.Dispatch<React.SetStateAction<AirportLocal | null>>;
  label: string;
};

const AirportAutocomplete = React.memo(({ value, setValue, label }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [airports, setAirports] = useState<AirportLocal[]>([]);

  const fetchAirports = useCallback(async (query: string) => {
    const response = await fetch(`/api/getAirportCodes?query=${query}`);
    const airportData = (await response.json()) as AirportLocal[];
    setAirports(airportData);
  }, []);

  useEffect(() => {
    fetchAirports('');
  }, [fetchAirports]);

  const onInputChange = useCallback(
    async (_event: SyntheticEvent<Element, Event>, val: string) => {
      setLoading(true);
      if (val) {
        const selectedAirport = airports.find(
          (airport) => airport.searchString === val,
        );
        if (selectedAirport) {
          setValue(selectedAirport);
        }
      } else {
        setValue(null);
      }

      const typingTimeout = setTimeout(() => {
        fetchAirports(val);
        setLoading(false);
      }, 500);

      return () => {
        clearTimeout(typingTimeout);
      };
    },
    [airports, fetchAirports, setValue],
  );

  const options = useMemo(
    () => airports.map((airport) => airport.searchString),
    [airports],
  );

  return (
    <Autocomplete
      id={`airport-autocomplete-${label}`}
      options={options}
      value={value?.searchString ?? ''}
      loading={loading}
      freeSolo
      onInputChange={onInputChange}
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
      onChange={(_event, newValue) => {
        const selectedAirport = airports.find(
          (airport) => airport.searchString === newValue,
        );
        if (selectedAirport) {
          setValue(selectedAirport);
        } else {
          setValue(null);
        }
      }}
    />
  );
});

AirportAutocomplete.displayName = 'AirportAutocomplete';

export default AirportAutocomplete;
