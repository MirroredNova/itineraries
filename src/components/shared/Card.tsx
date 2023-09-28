import React from 'react';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const Card = ({ className, children }: Props) => (
  <div
    className={`bg-secondary-light rounded-lg text-secondary-dark ${className}`}
  >
    {children}
  </div>
);

export default Card;
