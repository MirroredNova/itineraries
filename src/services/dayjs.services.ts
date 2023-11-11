import dayjs, { Dayjs } from 'dayjs';

export const formatDatetimeAsString = (date: Dayjs | null) => {
  if (!date) {
    return '';
  }
  return date.format('YYYY-MM-DD h:mm A');
};

export const parseDatetimeFromString = (date: string | undefined) => {
  if (!date) {
    return null;
  }
  return dayjs(date, 'YYYY-MM-DD h:mm A');
};

export const formatDatetimeAsTimeString = (date: Dayjs | null) => {
  if (!date) {
    return '';
  }
  return date.format('h:mm A');
};

export const parseDatetimeFromTimeString = (date: string | undefined) => {
  if (!date) {
    return null;
  }
  return dayjs(date, 'h:mm A');
};
