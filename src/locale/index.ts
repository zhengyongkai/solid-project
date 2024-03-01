import { createI18n, I18n } from 'solid-i18n';
import enLang from './lang/en';
import zhLang from './lang/zh';
import { langInf } from '@/types';
import { M_LANG } from '@/constants';

export const langMap = new Map([
  ['zh-TW', '繁體'],
  ['zh-CN', '中文'],
  ['en-US', 'English'],
]);

class locale {
  static i18n: Readonly<I18n>;
  static getInstance(language: langInf) {
    if (!this.i18n) {
      this.i18n = createI18n({
        language,
        locales: {
          'en-US': enLang,
          'zh-CN': zhLang,
        },
      });
    }
    return this.i18n;
  }
  static t(value: string) {
    return this.i18n.t(value);
  }
  static setLanguage(language: langInf) {
    this.i18n.setLanguage(language);
    window.localStorage.setItem(M_LANG, language);
  }
  static getLanguage() {
    const value = this.i18n.language;
    return {
      name: langMap.get(value),
      value: value,
    };
  }
}

export default locale;
