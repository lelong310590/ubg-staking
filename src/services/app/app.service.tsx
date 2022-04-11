import {FC} from "react";
import {Store} from "redux";
import Useragent from 'express-useragent';
import Head from "next/head";

import {CookieService, ECookieVariable} from "../cookie";
import {IDevice, IHead, IRender, TDeviceType} from "../../AppTypes";
import {getEnv} from "../../AppConfigs";
import {translate} from "../../AppLanguages";
import {ClassNames, CreateNotification, NotiferButton, StringUtils} from "../../modules";
import {SET_APP_CLIENT_DEVICE_INFORMATION} from "./app.reducer";
import {SET_APP_LANGUAGE} from "./app.reducer";
import {useSelector} from "../../AppStores";

export class AppService {
    static forceUpdateApp: () => any = () => true;

    static detectUserDevice(ctx: any, store: Store) {
        const deviceDetected: Useragent.Details = Useragent.parse(ctx.req.headers['user-agent']);

        const deviceType: TDeviceType =
            deviceDetected.isDesktop ? 'Desktop' :
                deviceDetected.isMobile ? 'Mobile' :
                    deviceDetected.isTablet ? 'Tablet' :
                        'None'

        const device: IDevice = {
            type: deviceType,
            browser: deviceDetected.browser,
            version: deviceDetected.version,
            os: deviceDetected.os,
            platform: deviceDetected.platform,
            isiPhone: deviceDetected.isiPhone,
            source: deviceDetected.source,
        }

        return store.dispatch({type: SET_APP_CLIENT_DEVICE_INFORMATION, data: device}).data;
    }

    static setLang(lang: any, store: Store): void {
        store.dispatch({type: SET_APP_LANGUAGE, data: lang});
    }

    static renderPage = (configs: IRender = {}) => () => {
        const {type} = useSelector(state => state.app.device);
        return <div className={ClassNames({App: true, [configs.className]: !!configs.className})}>
            {AppService.renderHead(configs.head)}
            {type === 'Mobile' ? <configs.mobile/> :
                type === 'Desktop' ? <configs.desktop/> :
                    type === 'Tablet' ? <configs.tablet/> :
                        null}
        </div>
    }

    static renderHead(main: IHead = {}): any {
        const configs: any = {
            title: main.title ? `${main.title} | ${getEnv('APP_NAME')}` : getEnv('META_TITLE'),
            thumbnailURL: main.thumbnailURL || `${getEnv('PUBLIC_URL')}/images/thumbnail.png`,
            webURL: main.webURL === '/' ? getEnv('PUBLIC_URL') : main.webURL || '/',
            description: StringUtils.removeHtmlTags(main.description || getEnv('META_DESCRIPTION')),
            siteName: main.siteName || getEnv('META_SIZE_NAME'),
            type: main.type || 'website',
            favicon: main.favicon || '/favicon.ico'
        }

        // ============================ Convert Values ============================
        let webURL = StringUtils.isURL(main.webURL || '') ? main.webURL : `${getEnv('PUBLIC_URL')}${main.webURL}`;
        if (main.webURL === '/') webURL = getEnv('PUBLIC_URL');

        // ============================ Render ============================
        return (
            <Head>
                <title>{configs.title}</title>
                <link rel="canonical" href={configs.webURL}/>
                <link rel="shortcut icon" href={configs.favicon}/>
                <meta name="description" content={configs.description}/>
                <meta property="og:title" content={configs.title}/>
                <meta property="og:image:url" content={configs.thumbnailURL}/>
                <meta property="og:image" content={configs.thumbnailURL}/>
                <meta property="og:description" content={configs.description}/>
                <meta property="og:url" content={webURL}/>
                <meta property="og:site_name" content={configs.siteName}/>
                <meta property="og:type" content={configs.type}/>
            </Head>
        );
    }

    static renderView(options: { mobile?: FC<any>, desktop?: FC<any> }) {
        const deviceType = CookieService.get(ECookieVariable.DEVICE_TYPE) || 'Desktop' as TDeviceType;
        if (deviceType === 'Desktop' && options.desktop) return <options.desktop/>
        if (deviceType === 'Mobile' && options.mobile) return <options.mobile/>
        return null
    }

    static createErrNoti(message: any, configs?: { buttons?: NotiferButton[] }) {
        let buttons = configs?.buttons || [];
        if (configs) {
        }

        return CreateNotification({
            icon: '/icons/error.png',
            title: translate('error'),
            body: message,
            buttons
        })
    }

    static createSuccessNoti(message: any, configs?: { buttons?: NotiferButton[] }) {
        return CreateNotification({
            icon: '/icons/success.png',
            title: translate('success'),
            body: message,
            ...configs,
        })
    }

    static throwError(error: {
        prod?: string,
        dev: any,
    }): any {
        if (['beta', 'production'].includes(getEnv('ENV'))) {
            // TODO: Alert telegram
            throw Error(error.prod || 'Internal error - Please contact support team!');
        }
        throw Error(error.dev)
    }
}