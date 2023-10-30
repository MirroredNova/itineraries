import FlightForm from '@/components/plan/forms/blockForms/FlightForm';
import NameForm from '@/components/plan/forms/configForms/NameForm';
import TripLengthForm from '@/components/plan/forms/configForms/TripLengthForm';
import HotelForm from '@/components/plan/forms/blockForms/HotelForm';
import { Category } from '@/types/form.types';
import CountryForm from '@/components/plan/forms/configForms/CountryForm';

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
        form: CountryForm,
      },
      {
        id: '3',
        type: 'Seasons',
        accordionLabel: 'Seasons',
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
      },
      {
        id: '2',
        type: 'Trip',
        accordionLabel: 'Trip',
      },
      {
        id: '3',
        type: 'Group',
        accordionLabel: 'Group',
      },
      {
        id: '4',
        type: 'Country',
        accordionLabel: 'Country',
      },
    ],
  },
];
