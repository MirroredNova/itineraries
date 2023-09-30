import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Form = ({ children, className }: Props) => (
  <form className={`flex flex-col gap-4 ${className}`}>{children}</form>
);

export default Form;
