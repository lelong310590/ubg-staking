import { FC, useEffect, useState } from 'react'
import { useStore } from 'react-redux'
import { getLocaleKey } from '../../AppLanguages'
import { useSelector } from '../../AppStores'
import { Button, Header, InputNumber, InputText, Message } from '../../components'
import { Footer } from '../../components/blocks/footer'
import { ClassNames, DateTimeUtils, InputWraper, ObjectUtils, useForm } from '../../modules'
import { CookieService, ECookieVariable, ESMCStatus, SmcService } from '../../services'

export const IDOPage: FC = () => {
  const ido = useSelector(s => s.ido);
  const store = useStore();
  const smc = useSelector(s => s.smc);

  const initialize = async () => {
    await SmcService.fetchIdoInvestor(store);
    await SmcService.fetchIdoPrice(store);
    await SmcService.fetchIDOTokenName(store);
  }

  useEffect(() => {
    if (smc.status === ESMCStatus.READY) {
      initialize();
    }
  }, [smc])

  return (
    <>
      <Header isIDOPage />
      <div className="IDOPage">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-8">
              <div className="head">
                <img src="/images/main.png" alt="" />
                <div className="content">
                  <h1>The 4.0 <br /> Community Fund</h1>
                  <p style={{ marginBottom: "20px" }}>Supports the NFT & Decentralized Applications projects</p>

                  <div className="IdoPrice">
                    <span className="label">Price</span>
                    <span className="value">{(ido.price).toLocaleString(getLocaleKey(true), { maximumFractionDigits: 10 })} BNB</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <CountDown />
            </div>
          </div>
        </div>

        <div className="container mt45">
          <div className="row">
            <div className="col-sm-6">
              <BuyTokenForm />
            </div>
            <div className="col-sm-6">
              <ClaimForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const CountDown: FC = () => {
  const [now, setNow] = useState(Date.now());
  const endTime = new Date(2021, 7, 5);

  const { days, hours, minutes, seconds } = DateTimeUtils.coutdown(endTime, now);

  useEffect(() => {
    let interval = setInterval(() => {
      setNow(Date.now());
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, [])

  const convertValue = (num: number) => {
    if (num < 10) return `0${num}`;
    return num;
  }

  return <div className="CountDown">
    <div className="title">ICO Ends In:</div>
    <div className="body">
      <div className="item">
        <span className="value">{convertValue(days)}</span>
        <span className="label">Days</span>
      </div>
      <div className="item">
        <span className="value">{convertValue(hours)}</span>
        <span className="label">Hours</span>
      </div>
      <div className="item">
        <span className="value">{convertValue(minutes)}</span>
        <span className="label">Mins</span>
      </div>
      <div className="item">
        <span className="value">{convertValue(seconds)}</span>
        <span className="label">Seconds</span>
      </div>
    </div>
  </div>
}

export const BuyTokenForm: FC = () => {
  const ido = useSelector(s => s.ido);
  const smcStatus = useSelector(s => s.smc.status);
  const minAmount = 0.01;
  const maxAmount = 5;
  const store = useStore();

  const validateAmount = (value: Number) => {
    if (value) {
      if (value < minAmount) return `Must be more than min amount ${minAmount}`;
      if (value > maxAmount) return `Must be less than max amount ${maxAmount}`;
    }
  }

  const { handleSubmit, inputProps, isSubmitting, values } = useForm({
    enableReinitialize: true,
    fields: {
      affiliateCode: {
        defaultValue: CookieService.get(ECookieVariable.USER_AFFILIATE_CODE) || ObjectUtils.getIn(ido.investor, 'presenterAddress', ''),
        label: ido.investor && ido.investor.isClaimed ? 'Your Presenter\'s address' : 'Presenter\'s address',
        isDisabled: ido.investor && ido.investor.isRegistered,
      },
      amount: {
        isRequired: true,
        validate: validateAmount,
        description: `Min amount: ${minAmount} | Max amount: ${maxAmount}`
      }
    },
    onSubmit: async ({ values, formikHelpers }) => {
      await SmcService.buyToken(store, values.affiliateCode, values.amount);
      formikHelpers.resetForm();
    }
  });

  return <form className="BuyTokenForm Form" onSubmit={handleSubmit}>
    <div className="formTitle">IDO</div>
    <InputWraper inputProps={inputProps.affiliateCode} component={InputText} />
    <InputWraper inputProps={inputProps.amount} component={InputNumber} />

    {function () {
      if (smcStatus === ESMCStatus.META_MASK_NOT_INSTALLED) return <div className="SmcButton" onClick={() => window.open('https://metamask.io')}>
        <img src="/images/metamask.png" alt="" className="logo" />
        <span className="label">Install Metamask</span>
      </div>

      if (smcStatus === ESMCStatus.WALLET_MUST_BE_CONNECTED) return <div className="SmcButton" onClick={() => SmcService.handleConnectWallet()}>
        <img src="/images/metamask.png" alt="" className="logo" />
        <span className="label">Connect Metamask Wallet</span>
      </div>

      return <Button label={<span className={ClassNames({
        labelWraper: true,
        active: !!values.amount
      })}>
        <span className="value">Buy Token</span>
        {!!values.amount && <span className="receive">Get {(values.amount * (1 / ido.price)).toLocaleString(getLocaleKey(true))} {ido.tokenName}</span>}
      </span>} onClick={handleSubmit} isLoading={isSubmitting} />
    }()}

    <div className="listNote">
      <p>(*) Let’s share to get 50% all of Claim </p>
      <ul>
        <li>25% of Purchase at Level 1</li>
        <li>15% of Purchase at Level 2</li>
        <li>10% of Purchase at Level 3</li>
      </ul>
      <p>(*) There is no limit bonus for Referral.</p>
    </div>
  </form>
}

export const ClaimForm: FC = () => {
  const ido = useSelector(s => s.ido);
  const smcStatus = useSelector(s => s.smc.status);
  const store = useStore();

  const { handleSubmit, inputProps, isSubmitting } = useForm({
    enableReinitialize: true,
    fields: {
      affiliateCode: {
        defaultValue: CookieService.get(ECookieVariable.USER_AFFILIATE_CODE) || ObjectUtils.getIn(ido.investor, 'presenterAddress', ''),
        label: ido.investor && ido.investor.isClaimed ? 'Your Presenter\'s address' : 'Presenter\'s address',
        isDisabled: ido.investor && ido.investor.isRegistered
      },
    },
    onSubmit: async ({ values }) => {
      return SmcService.claim(store, values.affiliateCode);
    }
  });

  return <form className="ClaimForm Form" onSubmit={handleSubmit}>
    <div className="formTitle">Airdrop</div>
    <InputWraper inputProps={inputProps.affiliateCode} component={InputText} />

    {function () {
      if (smcStatus === ESMCStatus.META_MASK_NOT_INSTALLED) return <div className="SmcButton" onClick={() => window.open('https://metamask.io')}>
        <img src="/images/metamask.png" alt="" className="logo" />
        <span className="label">Install Metamask</span>
      </div>

      if (smcStatus === ESMCStatus.WALLET_MUST_BE_CONNECTED) return <div className="SmcButton" onClick={() => SmcService.handleConnectWallet()}>
        <img src="/images/metamask.png" alt="" className="logo" />
        <span className="label">Connect Metamask Wallet</span>
      </div>

      if (ido && ido.investor && ido.investor.isClaimed) return <Message
        type="INFO"
        content="You already claimed. Please wait next round."
      />

      return <Button
        label="Claim"
        onClick={handleSubmit}
        isLoading={isSubmitting}
      />
    }()}

    <div className="listNote">
      <p>(*) Each Referral friend claims you can 1000 token.</p>
      <p>(*) Let’s share to get 50% all of Claim </p>
      <ul>
        <li>25% of Purchase at Level 1</li>
        <li>15% of Purchase at Level 2</li>
        <li>10% of Purchase at Level 3</li>
      </ul>
      <p>(*) There is no limit bonus for Referral.</p>
    </div>
  </form>
}