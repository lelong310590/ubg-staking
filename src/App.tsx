import { useEffect, useState } from "react";
import Head from "next/head";

import { AppService, CookieService, ECookieVariable, SmcService } from "./services";
import { useSelector, wrapper } from "./AppStores";
import { Notifier } from "./modules";
import { ModalWallet, ModalPoolDetail, ModalPoolDeposit } from "./modals";
import { useStore } from "react-redux";

const App = (props: any) => {
  const store = useStore();
  const update = useState(Date.now());
  AppService.forceUpdateApp = () => update[1](Date.now());
  const { Component, pageProps } = props;
  const device = useSelector(state => state.app.device);

  useEffect(() => {
    SmcService.initialize(store);
  }, [])

  return <>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

      {/* --------- Include Styles --------- */}
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="/styles/bootstrap-grid.min.css" />
    </Head>

    <div className={device.type}>
      <Notifier />
      <ModalWallet />
      <ModalPoolDetail />
      <ModalPoolDeposit />

      <Component {...pageProps} />
    </div>
  </>
}

App.getInitialProps = async (props: any) => {
  const { Component, ctx } = props;

  const url = ctx.req?.url;
  const ignoreURL = ['/_next', '/styles', '/fonts', '/images', '/favicon', '/vercel'];
  const isAvailable = !!ctx.req && !ignoreURL.find(i => url.indexOf(i) !== -1);

  if (isAvailable) {
    CookieService.context = ctx;
    AppService.detectUserDevice(ctx, ctx.store);
    const ref = ctx.query['ref'];
    if (ref) CookieService.set(ECookieVariable.USER_AFFILIATE_CODE, ref);
  }

  return {
    pageProps: {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
      )
    }
  }
}

export default wrapper.withRedux(App)