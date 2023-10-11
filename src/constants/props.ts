import { FormEvent } from 'react';
import { Plan } from './plan';

export type FormProps = {
  planData: Plan;
  getHandleConfigSubmit: (
    FORM_KEY: string,
    data: string | undefined,
  ) => (e: FormEvent<HTMLFormElement>) => void;
};
