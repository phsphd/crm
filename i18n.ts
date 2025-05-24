// i18n.ts (keep ONLY this)
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`./locales/${locale}.json`)).default,
    timeZone: "America/New_York",
  };
});