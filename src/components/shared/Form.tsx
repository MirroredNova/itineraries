import Button from '@mui/material/Button';
import React, { FormEvent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

const Form = ({ children, className, onSubmit }: Props) => (
  <form className={`flex flex-col gap-4 ${className}`} onSubmit={onSubmit}>
    {children}
    <Button variant="contained" type="submit" className="w-fit">
      Save
    </Button>
  </form>
);

export default Form;
