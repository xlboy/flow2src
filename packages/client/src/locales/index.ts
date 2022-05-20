import { getSystemStore } from '@/store';
import { createIntl } from '@formatjs/intl';
import type { IntlShape, MessageDescriptor } from 'react-intl';
import { useIntl } from 'react-intl';
import { rootAppLocale } from './rootLocales';
import type { AppLocaleId, LocaleTypes } from './types';

export function getAppLocale(type: LocaleTypes): Record<string, string> {
  const localeIndexMapping: Record<LocaleTypes, number> = {
    'zh-CN': 0,
    'zh-TW': 1,
    'en-US': 2
  };

  return Object.entries(rootAppLocale).reduce(
    (previousValue, [k, v]) => ({
      ...previousValue,
      [k]: v[localeIndexMapping[type]]
    }),
    {}
  );
}

export function useAppIntl() {
  const intl = useIntl();

  return intlWrapper(intl);
}

export function getAppIntl() {
  const { currentLocale } = getSystemStore().getState();

  const intl = createIntl({
    locale: currentLocale,
    messages: getAppLocale(currentLocale)
  });

  return intlWrapper(intl as IntlShape);
}

interface _FormatMessageProps extends MessageDescriptor {
  id: AppLocaleId;
}

type FormatMessageProps = (descriptor: _FormatMessageProps, options?: Record<string, string>) => string;

/**
 * @description 国际化插件的类型加工，完善ts提示
 */
function intlWrapper(intl: IntlShape) {
  const { formatMessage: _formatMessage, ...rest } = intl;
  const formatMessage: FormatMessageProps = _formatMessage;

  return {
    ...rest,
    formatMessage,
    f: <T extends AppLocaleId, PlaceholderKeys extends Record<string, any>>(id: T, options?: PlaceholderKeys) =>
      formatMessage({ id }, options)
  };
}
