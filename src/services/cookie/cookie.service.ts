import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { getEnv } from '../../AppConfigs';

export enum ECookieVariable {
  DEVICE_TYPE = 'device_type',
  // ======================= User related =======================
  USER_WALLET_ADDRESS = 'usr_wallet',
  USER_AFFILIATE_CODE = 'usr_affiliate_code',
  USER_LOCALE = 'locale',
}

export class CookieService {
  static context = null;

  static get(name: ECookieVariable): string {
    const isServer = typeof window === 'undefined';

    if (!isServer) {
      // ======================= From Client Side =======================
      const value = '; ' + document.cookie;
      const parts: any = value.split('; ' + name + '=');
      if (parts.length == 2) return parts.pop().split(';').shift() || '';
      return ''
    } else {
      // ======================= From Server Side =======================
      const cookies = parseCookies(this.context);
      return cookies[name] || '';
    }
  }

  static set(name: ECookieVariable, value: string, options = {}) {
    const ONE_DAY = 86400;
    const cookieOptions = { maxAge: ONE_DAY * 120, path: `/`, ...options }
    return setCookie(this.context, name, value, cookieOptions);
  }

  static remove(name: ECookieVariable) {
    return destroyCookie(this.context, name);
  }
}
