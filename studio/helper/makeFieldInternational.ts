
import  AppConfig  from '../../AppConfig';

export const makeFieldInternational = (field) => {
  return AppConfig.i18n.locales.map((locale) => {
    if (locale === AppConfig.i18n.defaultLocale) {
      return field;
    }

    return {...field, name:`${field.name}_${locale}`,title:`${field.title} ${locale}`}
  });
};