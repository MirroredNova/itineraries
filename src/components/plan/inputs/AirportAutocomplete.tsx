import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { AirportLocal } from '@/types/airport.types';

type Props = {
  value: AirportLocal | null;
  setValue: Dispatch<SetStateAction<AirportLocal | null>>;
  label: string;
  required?: boolean;
};

const AirportAutocomplete = memo(
  ({ value, setValue, label, required = false }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [airports, setAirports] = useState<AirportLocal[]>([]);

    const fetchAirports = useCallback(async (query: string) => {
      const response = await fetch(`/api/db/getAirportCodes?query=${query}`);
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
        value={value?.searchString ?? null}
        loading={loading}
        onInputChange={onInputChange}
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
            required={required}
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
  },
);

AirportAutocomplete.displayName = 'AirportAutocomplete';

export default AirportAutocomplete;
