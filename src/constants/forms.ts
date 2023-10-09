import FlightForm from '@/components/plan/forms/FlightForm';
import NameForm from '@/components/plan/forms/NameForm';
import OriginAirportForm from '@/components/plan/forms/OriginAirportForm';
import OriginDateForm from '@/components/plan/forms/OriginDateForm';

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
        id: '4',
        type: 'Trip Length',
        accordionLabel: 'Trip Length',
        form: NameForm,
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
