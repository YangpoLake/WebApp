import VueI18n from "vue-i18n";

import { getLanguage } from "../utils/cookies";

// element-ui built-in lang
import * as elementEnLocale from "element-ui/lib/locale/lang/en";
import * as elementZhLocale from "element-ui/lib/locale/lang/zh-CN";
import * as elementEsLocale from "element-ui/lib/locale/lang/es";
import * as elementJaLocale from "element-ui/lib/locale/lang/ja";
import * as elementKoLocale from "element-ui/lib/locale/lang/ko";

// User defined lang
import enLocale from "./en";
import zhLocale from "./zh";
import esLocale from "./es";
import jaLocale from "./ja";
import koLocale from "./ko";

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  es: {
    ...esLocale,
    ...elementEsLocale
  },
  ja: {
    ...jaLocale,
    ...elementJaLocale
  },
  ko: {
    ...koLocale,
    ...elementKoLocale
  }
};

export const getLocale = () => {
  const cookieLanguage = getLanguage();
  if (cookieLanguage) {
    return cookieLanguage;
  }

  const language = navigator.language.toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }

  // Default language is english
  return "en";
};

const i18n = new VueI18n({
  locale: getLocale(),
  messages
});

export default i18n;
