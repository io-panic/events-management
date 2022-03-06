import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  inheritLocale: true,
  locale: "en",
  fallbackRoot: true,
  fallbackLocale: "en",
  fallbackWarn: false
});

export function getBrowserLocale({ countryCodeOnly = false }) {
  const navigatorLocale = navigator.languages !== undefined ? navigator.languages[0] : navigator.language;

  if (!navigatorLocale) {
    return null;
  }

  const trimmedLocale = countryCodeOnly ? navigatorLocale.trim().split(/-|_/)[0] : navigatorLocale.trim();

  return trimmedLocale;
}

export default i18n;
