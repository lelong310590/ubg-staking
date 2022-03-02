import ReactHtmlParser from 'html-react-parser';

import { ELocale } from "./AppTypes";
import dictionary from '../lang/dictionary.json';
import { AppService, CookieService, ECookieVariable } from './services';

export type TLocale = {
    id: number,
    key: ELocale,
    label: string,
    isActive: boolean,
    order: number
}

export const locales: TLocale[] = [
    {
        id: 1,
        key: ELocale.ENGLISH,
        label: 'English',
        isActive: true,
        order: 1,
    },
    {
        id: 2,
        key: ELocale.VIETNAM,
        label: 'Việt Nam',
        isActive: true,
        order: 1,
    }
].sort((a, b) => a.order - b.order);

export const setLocale = (locale: ELocale): void => {
    CookieService.set(ECookieVariable.USER_LOCALE, locale);
    AppService.forceUpdateApp();
};

export const getLocale = (): TLocale => {
    let locale: TLocale;

    const fromCookie = CookieService.get(ECookieVariable.USER_LOCALE);
    const currentLocale = locales.find(item => item.key === fromCookie);
    if (!currentLocale) {
        locale = locales[0];
        CookieService.set(ECookieVariable.USER_LOCALE, locale.key);
    } else {
        locale = currentLocale;
    }

    return locale;
}

export const getLocaleKey = (isUseJSFunc = false): string => isUseJSFunc ? getLocale().key.replace('_', '-') : getLocale().key

export const translate = (id: string, values?: any): any => {
    const locale: string = getLocaleKey();
    let sentence: string;

    // @ts-ignore
    if (dictionary[id] && dictionary[id][locale]) {
        // @ts-ignore
        sentence = dictionary[id][locale]
    } else {
        console.warn(`[WARNING][TRANSLATE] Miss translate | Locale: "${locale}" | id: "${id}"`);
        return `${id}`
    }

    // Match values
    if (typeof values === 'object') {
        Object.entries(values).map(item => {
            // @ts-ignore
            sentence = sentence.replace(new RegExp(`{${item[0]}}`, 'g'), item[1])
            return item
        })
    }

    // HTML
    if (/<\/?[a-z][\s\S]*>/.test(sentence)) return ReactHtmlParser(sentence);
    return sentence;
}