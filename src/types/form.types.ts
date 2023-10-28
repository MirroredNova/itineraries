export type Category = {
  id: string;
  headerLabel: string;
  options: Option[];
};

type Option = {
  id: string;
  type: string;
  accordionLabel: string;
  form?: () => React.JSX.Element;
};
