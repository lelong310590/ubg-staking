import { useEffect, useState } from 'react';

import { withModalWraper } from '../modalWraper';
import { AppService, Pool, SmcService, UserPoolInfo, withSmcWalletWraper } from '../../services'
import { Button, Icon, Message } from '../../components';
import { getLocaleKey } from '../../AppLanguages';
import { ResponseState } from '../../AppTypes';
import { OnModalPoolDeposit } from '../pool-deposit';
import { ClassNames } from '../../modules';
import { useSelector } from '../../AppStores';

interface State {
  pid: number,
}

export let OnModalPoolDetail: (state: State) => any = (state: State) => state;
export const ModalPoolDetail = withModalWraper({
  title: 'Pool Information',
  className: 'ModalPoolDetail',
  bind: (configs) => {
    OnModalPoolDetail = (state: State) => {
      configs.setTitle(`Pool Information #${state.pid}`);
      configs.onModal(state);
    }
  }
})((configs) => {
  const pools = useSelector(state => state.smcPools.data);
  const pool = pools.find(v => v.pid === configs.data.pid) as Pool;

  const Form = withSmcWalletWraper(() => {
    const state = configs.data as State;
    const { pid } = state;
    const [userPoolInfo, setUserPoolInfo] = useState({ isFetched: false, error: '' } as ResponseState<UserPoolInfo>);

    const fetchUserPoolInfo = async () => {
      return SmcService.contractMAIN.userPoolInfo(pid)
        .then(res => setUserPoolInfo({ isFetched: true, data: res }))
        .catch(err => setUserPoolInfo({ isFetched: true, data: null, error: err.message }));
    }

    const handleClaim = async () => {
      try {
        await SmcService.contractMAIN.claimReward(pid);
        await fetchUserPoolInfo();
        AppService.createSuccessNoti('Claim successful.');
      } catch (error) {
        AppService.createErrNoti(error.message);
      }
    }

    useEffect(() => {
      fetchUserPoolInfo();
    }, [pid])

    return <>
      {function () {
        if (!userPoolInfo.isFetched) return <div className="loading"><Icon.Loading /></div>
        if (userPoolInfo.error) return <Message type="ERROR" content={userPoolInfo.error} />

        return <div className="form">
          <div className="row">
            <div className="col-sm-6">
              <div className="numberReports">
                <div className="item">
                  <div className="label">Amount</div>
                  <div className="value">
                    {userPoolInfo.data.amount.toLocaleString(getLocaleKey(true))} USDT
                </div>
                </div>
              </div>

              <div className="ctas">
                <Button
                  label="Invest"
                  onClick={() => OnModalPoolDeposit({
                    onSuccess: fetchUserPoolInfo, pid: state.pid
                  })}
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className={ClassNames({ numberReports: true, claim: true, disabled: !!!userPoolInfo.data.pendingReward })}>
                <div className="item">
                  <div className="label">Able to Claim</div>
                  <div className="value">
                    {userPoolInfo.data.pendingReward.toLocaleString(getLocaleKey(true), { maximumFractionDigits: 6 })} NCF
                </div>
                </div>
              </div>

              <div className="ctas">
                <Button
                  buttonType="warning"
                  label="Claim"
                  disabled={!!!userPoolInfo.data.pendingReward}
                  onClick={handleClaim}
                />
              </div>
            </div>
          </div>
        </div>

      }()}
    </>
  })

  if (!pool) return null

  return <>
    <div className="poolInfo">
      <img src="/images/pool.png" alt="" />
      <div className="content">
        <div className="name">UBG-WBNB Cake-LP and Earn UBU</div>
        <table>
          <tbody>
            <tr>
              <td>PID</td>
              <td>{pool.pid}</td>
            </tr>
            <tr>
              <td>UBU-WBNB Cake-LP</td>
              <td>--</td>
            </tr>
            <tr>
              <td>Earn</td>
              <td>--</td>
            </tr>
            <tr>
              <td>APY</td>
              <td>--</td>
            </tr>
            <tr>
              <td>TVL</td>
              <td>--</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Form />
  </>
})