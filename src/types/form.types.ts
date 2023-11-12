export type Category = {
  id: string;
  headerLabel: string;
  options: Option[];
};

export type Option = {
  id: string;
  type: string;
  accordionLabel: string;
  form?: () => React.JSX.Element;
};

export type FormTypes = 'split' | 'standard';
