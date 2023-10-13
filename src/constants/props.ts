import { FormEvent } from 'react';
import { Plan } from './plan';

export type ConfigDataType = string | undefined;
export type ChunkDataType = object | undefined;

export type FormProps = {
  planData: Plan;
  getHandleConfigSubmit: (
    FORM_KEY: string,
    data: string | undefined,
  ) => (e: FormEvent<HTMLFormElement>) => void;
  getHandleChunkSubmit: (
    FORM_KEY: string,
    data: object | undefined,
  ) => (e: FormEvent<HTMLFormElement>) => void;
};
