import FlightForm from '@/components/plan/forms/blockForms/FlightForm';
import NameForm from '@/components/plan/forms/configForms/NameForm';
import TripLengthForm from '@/components/plan/forms/configForms/TripLengthForm';
import HotelForm from '@/components/plan/forms/blockForms/HotelForm';

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

export const categories: Category[] = [
  {
    id: '1',
    headerLabel: 'Settings',
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
        type: 'Countries',
        accordionLabel: 'Countries',
      },
    ],
  },
  {
    id: '2',
    headerLabel: 'Add Chunk',
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
  {
    id: '3',
    headerLabel: 'Add Grouping',
    options: [
      {
        id: '1',
        type: 'Day',
        accordionLabel: 'Day',
        form: FlightForm,
      },
      {
        id: '2',
        type: 'Trip',
        accordionLabel: 'Trip',
        form: FlightForm,
      },
      {
        id: '3',
        type: 'Group',
        accordionLabel: 'Group',
        form: FlightForm,
      },
    ],
  },
];
