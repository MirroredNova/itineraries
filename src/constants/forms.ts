import FlightForm from '@/components/plan/forms/blockForms/FlightForm';
import NameForm from '@/components/plan/forms/configForms/NameForm';
import OriginAirportForm from '@/components/plan/forms/configForms/OriginAirportForm';
import OriginDateForm from '@/components/plan/forms/configForms/OriginDateForm';
import TripLengthForm from '@/components/plan/forms/configForms/TripLengthForm';
import HotelForm from '@/components/plan/forms/blockForms/HotelForm';
import { FormProps } from './props';

export type Category = {
  id: string;
  headerLabel: string;
  options: Option[];
};

export type Option = {
  id: string;
  type: string;
  accordionLabel: string;
  form: (props: FormProps) => React.JSX.Element;
};

export const categories: Category[] = [
  {
    id: '1',
    headerLabel: 'Configuration',
    options: [
      {
        id: '1',
        type: 'Name',
        accordionLabel: 'Name',
        form: NameForm,
      },
      {
        id: '4',
        type: 'Trip Length',
        accordionLabel: 'Trip Length',
        form: TripLengthForm,
      },
      {
        id: '2',
        type: 'Origin Airport',
        accordionLabel: 'Origin Airport',
        form: OriginAirportForm,
      },
      {
        id: '3',
        type: 'Origin Date',
        accordionLabel: 'Origin Date',
        form: OriginDateForm,
      },
    ],
  },
  {
    id: '2',
    headerLabel: 'Add New',
    options: [
      {
        id: '1',
        type: 'Transporation',
        accordionLabel: 'Flight',
        form: FlightForm,
      },
      {
        id: '2',
        type: 'Hotel',
        accordionLabel: 'Hotel',
        form: HotelForm,
      },
    ],
  },
];
