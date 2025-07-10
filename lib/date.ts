import moment from 'moment';

export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';
export const TIME_FORMAT = 'HH:mm';
export const SHORT_DATE_FORMAT = 'DD/MM/YYYY';
export const LONG_DATE_FORMAT = 'DD MMMM YYYY';
export const SHORT_DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm:ss';
export const LONG_DATE_TIME_FORMAT = 'DD MMMM YYYY HH:mm:ss';

export const formatDate = (date: Date | null | undefined, format: string): string => {
  return date ? moment(date).format(format) : '';
};

export const formatDateTime = (date: Date | null | undefined): string => formatDate(date, DATE_TIME_FORMAT);

export const formatTime = (date: Date | null | undefined): string => formatDate(date, TIME_FORMAT);

export const formatShortDate = (date: Date | null | undefined): string => formatDate(date, SHORT_DATE_FORMAT);

export const formatLongDate = (date: Date | null | undefined): string => formatDate(date, LONG_DATE_FORMAT);

export const formatShortDateTime = (date: Date | null | undefined): string => formatDate(date, SHORT_DATE_TIME_FORMAT);

export const formatLongDateTime = (date: Date | null | undefined): string => formatDate(date, LONG_DATE_TIME_FORMAT);

