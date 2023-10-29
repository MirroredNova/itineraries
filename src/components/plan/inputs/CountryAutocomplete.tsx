import React, {
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { Country } from '@/types/country.services';

type Props = {
  value: string[];
  setValue: Dispatch<SetStateAction<string[]>>;
  label: string;
};

const CountryAutocomplete = memo(({ value, setValue, label }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]);

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `https://restcountries.com/v3.1/all?fields=name`,
    );
    const countryData = (await response.json()) as Country[];
    const countryName = countryData.map((country) => country.name.common);
    countryName.sort();
    setCountries(countryName);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return (
    <Autocomplete
      options={countries}
      loading={loading}
      multiple
      value={value}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" key={label} />
      )}
      renderTags={(val: readonly string[], getTagProps) =>
        val.map((option: string, index: number) => (
          <Chip label={option} {...getTagProps({ index })} key={index} />
        ))
      }
      renderOption={(props, option) => (
        <li {...props} key={option}>
          {option}
        </li>
      )}
      onChange={(e, val) => setValue(val)}
    />
  );
});

CountryAutocomplete.displayName = 'CountryAutocomplete';

export default CountryAutocomplete;
