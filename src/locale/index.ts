import { createI18n, I18n } from "solid-i18n";
import enLang from "./lang/en";
import zhLang from "./lang/zhTW";
import cnLang from "./lang/zhCN";
import { langInf } from "@/types";
import { M_LANG } from "@/constants";

function flatLang(item: Object, preKey = "", res: any = {}) {
  Object.entries(item).forEach(([key, val]) => {
    if (val && typeof val === "object") {
      flatLang(val, preKey + key + ".", res);
    } else {
      res[preKey + key] = val as string;
    }
  });
  return res;
}

export const langMap = new Map([
  ["zh-TW", "繁體"],
  ["zh-CN", "中文"],
  ["en-US", "English"],
]);

class locale {
  static i18n: Readonly<I18n>;
  static getInstance(language: langInf) {
    if (!this.i18n) {
      this.i18n = createI18n({
        language,
        locales: {
          "en-US": flatLang(enLang),
          "zh-CN": flatLang(cnLang),
          "zh-TW": flatLang(zhLang),
        },
      });
    }
    return this.i18n;
  }
  // t('something')
  // t('something',['$1'],[123])
  static t(value: string, params?: string[], values?: string[]) {
    let result = this.i18n.t(value) as string;
    if (result && params && values) {
      params.map((item, index) => {
        return result.replace(item, values[index]);
      });
    }
    return result;
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
