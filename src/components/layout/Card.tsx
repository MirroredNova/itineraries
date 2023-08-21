import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => (
  <div className="bg-secondary-light rounded-lg text-5xl p-16 m-16 font-medium text-secondary-dark h-fit">
    {children}
  </div>
);

export default Card;
