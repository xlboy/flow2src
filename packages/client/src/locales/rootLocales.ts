import httpStatusLocale from './modules/httpStatus';
import systemLocale from './modules/system';

export const rootAppLocale = {
  ...systemLocale,
  ...httpStatusLocale
} as const;
