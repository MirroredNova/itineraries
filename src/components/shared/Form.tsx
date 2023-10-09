import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form = ({ children, className, onSubmit }: Props) => (
  <form className={`flex flex-col gap-4 ${className}`} onSubmit={onSubmit}>
    {children}
  </form>
);

export default Form;
