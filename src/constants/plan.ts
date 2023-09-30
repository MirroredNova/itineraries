import FlightForm from '@/components/plan/forms/FlightForm';
import NameForm from '@/components/plan/forms/NameForm';
import OriginForm from '@/components/plan/forms/OriginForm';

export type Plan = {
  uniqueCode: string;
  dateCreated: string;
  label: string;
  chunks: [];
};

export const categories = [
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
        id: '2',
        type: 'Origin',
        accordionLabel: 'Origin',
        form: OriginForm,
      },
      {
        id: '3',
        type: 'From Date',
        accordionLabel: 'From Date',
        form: FlightForm,
      },
      {
        id: '4',
        type: 'To Date',
        accordionLabel: 'To Date',
        form: FlightForm,
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
        form: FlightForm,
      },
      {
        id: '3',
        type: 'Rental',
        accordionLabel: 'Rental',
        form: FlightForm,
      },
    ],
  },
];
