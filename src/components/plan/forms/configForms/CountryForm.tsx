import Form from '@/components/shared/Form';
import useConfigForm from '@/hooks/useConfigForm';
import React, { FormEvent, useCallback, useState } from 'react';
import {
  countryArrayToString,
  countryStringToArray,
} from '@/services/country.services';
import CountryAutocomplete from '../../inputs/CountryAutocomplete';

const FORM_KEY = 'Country';

const CountryForm = () => {
  const { planData, handleSubmit } = useConfigForm(FORM_KEY);
  const [countries, setCountries] = useState<string[]>(() =>
    countryStringToArray(
      planData?.configs?.find((config) => config.type === FORM_KEY)?.data ?? '',
    ),
  );

  const handleCountrySubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e, countryArrayToString(countries));
    },
    [countries, handleSubmit],
  );

  return (
    <Form onSubmit={handleCountrySubmit}>
      <CountryAutocomplete
        label="Countries"
        value={countries}
        setValue={setCountries}
      />
    </Form>
  );
};

export default CountryForm;