import { FormEvent } from 'react';
import { Plan } from './plan';

export type ConfigDataType = string | undefined | null;
export type ChunkDataType = object | undefined;

export type FormProps = {
  planData: Plan;
  getHandleConfigSubmit: (
    FORM_KEY: string,
    data: ConfigDataType,
  ) => (e: FormEvent<HTMLFormElement>) => void;
  getHandleChunkSubmit: (
    FORM_KEY: string,
    data: ChunkDataType,
  ) => (e: FormEvent<HTMLFormElement>) => void;
};
