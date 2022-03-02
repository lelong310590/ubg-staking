import { useEffect } from 'react'
import { useState } from 'react'
import { FC } from 'react'
import { Element } from 'react-scroll'
import { clearIntervalAsync, setIntervalAsync } from 'set-interval-async/fixed'
import { getLocaleKey } from '../../../AppLanguages'
import { useSelector } from '../../../AppStores'
import { Button, Icon, InputNumber, Message } from '../../../components'
import { InputTagSelect } from '../../../components/input/tag-select'
import { DateTimeUtils, InputWraper, NumberUtils, useForm } from '../../../modules'
import { AppService, ESMCStatus, SmcService } from '../../../services'
import { StakePackage, StakingService, UserStake } from '../../../services/staking'

export const SectionBank: FC = () => {
  return (
    <Element name="SectionBank" className="Section SectionBank">
      <div className="container">
        <div className="sectionTitle">Staking</div>
        {/* <div className="sectionExcerpt">Dolore lobortis animi exercitation ipsa etiam</div> */}

        {/* <div className="numberReports mb25">
          <div className="row">
            <div className="col-sm-3">
              <div className="item">
                <div className="label">Circulating Supply</div>
                <div className="value">--</div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="item">
                <div className="label">Circulating Supply</div>
                <div className="value">--</div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="item">
                <div className="label">Circulating Supply</div>
                <div className="value">--</div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="item">
                <div className="label">Circulating Supply</div>
                <div className="value">--</div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="row justify-content-center">
          <div className="col-sm-5">
            <Form />
          </div>
        </div>
      </div>
    </Element>
  )
}

const Form: FC = () => {
  const smc = useSelector(s => s.smc);
  const [isFetched, setIsFetched] = useState(false);
  const [balance, setBalance] = useState(null as null | number);
  const [packages, setPackages] = useState(null as null | StakePackage[]);
  const [userStake, setUserStake] = useState(null as null | UserStake);
  const [isClaiming, setIsClaiming] = useState(false);
  const [now, setNow] = useState(new Date());

  const validateAmount = (value: number) => {
    if (value && typeof balance === 'number') {
      if (value > balance) return 'Your balance not enough';
    }
  }

  const { handleSubmit, isSubmitting, inputProps, values } = useForm({
    enableReinitialize: true,
    fields: {
      amount: {
        isRequired: true,
        label: 'Enter your amount to save',
        validate: validateAmount,
      },
      packageId: {
        isRequired: true,
        label: 'Saving duration',
        exProps: {
          options: packages ? packages.map(v => ({ label: v.name, value: v.id })) : [],
        },
        defaultValue: packages ? packages[0].id : '',
      }
    },
    onSubmit: async ({ values }) => {
      await SmcService.requestApprove({
        fromAddress: SmcService.configs.SMC_STAKING_ADDRESS,
        toContract: SmcService.contractUBGToken,
      }, values.amount)
        .then(async () => {
          return SmcService.send({
            contract: SmcService.contractStaking,
            method: 'stake'
          }, NumberUtils.cryptoConvert('encode', values.amount, SmcService.contractUBGToken._decimals), values.packageId)
            .then(async (res) => {
              await fetchUserBalance();
              await fetchUserStake();
              SmcService.transactionSuccessAlert(res, 'Stake successfully.');
            })
            .catch((err) => {
              SmcService.transactionErrorAlert(err, 'Stake failed.');
            })
        })
        .catch(() => {
          return AppService.createErrNoti('Approve amount failed.');
        })
    }
  })

  const fetchTime = async () => {
    return SmcService.call({
      contract: SmcService.contractStaking,
      method: 'getNow'
    })
      .then(res => {
        setNow(new Date(+res * 1000));
      });
  }

  const fetchUserBalance = async () => {
    await SmcService.call({
      contract: SmcService.contractUBGToken,
      method: 'balanceOf',
    }, SmcService.address)
      .then(res => {
        setBalance(+NumberUtils.cryptoConvert('decode', +res, SmcService.contractUBGToken._decimals));
      })
      .catch(() => false);
  }

  const fetchUserStake = async () => {
    return SmcService.call({
      contract: SmcService.contractStaking,
      method: 'stakes'
    }, SmcService.address)
      .then(res => {
        if (!(+res.initial)) return setUserStake(null);
        setUserStake({
          initial: +NumberUtils.cryptoConvert('decode', +res.initial, SmcService.contractUBGToken._decimals),
          reward: +NumberUtils.cryptoConvert('decode', +res.reward, SmcService.contractUBGToken._decimals),
          payAt: new Date(+res.payday * 1000),
          startAt: new Date(+res.startday * 1000)
        })
      })
      .catch(() => false);
  }

  const fetchPackages = async () => {
    return StakingService.fetchPackages()
      .then(res => setPackages(res))
      .catch(() => false);
  }

  const initialize = async () => {
    await fetchTime();
    await fetchPackages();
    setIsFetched(true);
  }

  useEffect(() => {
    let interval: any;
    let interval2: any;

    if (smc.status !== ESMCStatus.NONE) {
      initialize();
      interval = setIntervalAsync(async () => {
        await fetchTime();
      }, 1000);
    }

    if (smc.status === ESMCStatus.READY) {
      fetchUserBalance();
      fetchUserStake();

      interval2 = setIntervalAsync(async () => {
        await fetchUserBalance();
        await fetchUserStake();
      }, 1000);
    }

    return () => {
      if (interval) clearIntervalAsync(interval);
      if (interval2) clearIntervalAsync(interval2);
    }
  }, [smc.status])

  useEffect(() => {

  })

  const handleClaim = async () => {
    setIsClaiming(true);

    await SmcService.send({
      contract: SmcService.contractStaking,
      method: 'claim'
    })
      .then(async res => {
        await fetchUserBalance();
        await fetchUserStake();
        SmcService.transactionSuccessAlert(res, 'Claim successfully.');
      })
      .catch(err => {
        SmcService.transactionErrorAlert(err, 'Claim failed.');
      })

    setIsClaiming(false);
  }

  return <form onSubmit={handleSubmit}>
    <div className="head">
      <div className="title">Investment</div>
      <div className="UserBalance">
        <span className="icon"><Icon.Wallet /></span>
        <span className="label">Your balance:</span>
        <span className="value">{balance === null ? '--' : `${balance.toLocaleString(getLocaleKey(true), { maximumFractionDigits: 9 })} UBG`}</span>
      </div>
    </div>

    {function () {
      if (smc.error) return <div className="block">
        <Message type="INFO" content={smc.error} />
      </div>

      if (!isFetched) return <div className="Loading">
        <Icon.Loading />
        Loading...
      </div>

      const packageActive = packages.find(v => v.id === values.packageId) as StakePackage;
      const reward = values.amount ? (values.amount * packageActive.roi) / 100 : 0;

      if (userStake) return <>
        <div className="UserStake">
          <div className="title">UBG's saving information</div>

          <div className="content">
            <div className="rowInfo">
              <div className="label">Saving</div>
              <div className="value">{userStake.initial.toLocaleString(getLocaleKey(true), { maximumFractionDigits: 2 })} UBG</div>
            </div>
            <div className="rowInfo">
              <div className="label">Reward</div>
              <div className="value">{userStake.reward.toLocaleString(getLocaleKey(true), { maximumFractionDigits: 2 })} UBG</div>
            </div>
            <div className="rowInfo">
              <div className="label">Start Day</div>
              <div className="value">{DateTimeUtils.formatToShow(userStake.startAt, true, getLocaleKey(true))}</div>
            </div>
            <div className="rowInfo">
              <div className="label">Pay Day</div>
              <div className="value">
                <p>{DateTimeUtils.formatToShow(userStake.payAt, true, getLocaleKey(true))}</p>
                <p className="time">{countDownShow(userStake.payAt, new Date(now))}</p>
              </div>
            </div>
          </div>
        </div>
      </>

      return <>
        <InputWraper inputProps={inputProps.amount} component={InputNumber} />
        <InputWraper inputProps={inputProps.packageId} component={InputTagSelect} className="hideBorder" />

        <p className="note">After <strong className="textPrimary">{packageActive.numberOfDays} days</strong> with <strong className="textPrimary">{values.amount ? (+values.amount).toLocaleString(getLocaleKey(true), { maximumFractionDigits: 2 }) : '--'} UBG</strong>, you will able to claim <strong className="textPrimary">{reward ? reward.toLocaleString(getLocaleKey(true), { maximumFractionDigits: 2 }) : '--'} UBG</strong></p>
      </>
    }()}

    <div className="cta">
      {function () {
        if (smc.error) return
        if (smc.status === ESMCStatus.NONE) return;
        if (smc.status !== ESMCStatus.READY) return <Button label="Connect Wallet" buttonType="warning" onClick={() => SmcService.handleConnectWallet()} />
        if (userStake) {
          const isClaimActive = new Date(now).getTime() >= new Date(userStake.payAt).getTime();
          return <Button label="Claim" isLoading={isClaiming} onClick={handleClaim} disabled={!isClaimActive} />;
        }
        return <Button isLoading={isSubmitting} type="submit" label="Stake" />
      }()}
    </div>
  </form>
}

const countDownShow = (startTime: Date, endTime: Date) => {
  const { days, hours, minutes, isExpired } = DateTimeUtils.coutdown(endTime, new Date(startTime).getTime());
  if (isExpired) return ''

  let string = '';
  if (!!days) string += `${days}d`;
  if (!!hours) string += ` - ${hours}h`;
  if (!!minutes) string += ` - ${minutes}m`;

  return `Remain: ${string}`;
}