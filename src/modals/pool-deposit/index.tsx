import { useStore } from 'react-redux';

import { useSelector } from '../../AppStores';
import { withModalWraper } from '../modalWraper';
import { AppService, CookieService, ECookieVariable, SmcService } from '../../services'
import { InputWraper, useForm } from '../../modules';
import { Button, Icon, InputNumber } from '../../components';
import { getLocaleKey } from '../../AppLanguages';

interface State {
  pid: number,
  onSuccess: () => any,
}

export let OnModalPoolDeposit: (state: State) => any = (state: State) => state;
export const ModalPoolDeposit = withModalWraper({
  title: 'Deposit Pool',
  className: 'ModalPoolDeposit',
  bind: (configs) => {
    OnModalPoolDeposit = (state: State) => {
      configs.setTitle(`Deposit Pool #${state.pid}`);
      configs.onModal(state);
    }
  }
})((configs) => {
  const store = useStore();
  const state = configs.data as State;
  const { pid } = state;
  const { balanceUSDT, isFetching, error } = useSelector(state => state.smcWallet);

  const validateAmount = (value: number) => {
    if (!isFetching && !error && value > balanceUSDT) return 'Your balance does not enough';
  }

  const { inputProps, handleSubmit, isSubmitting } = useForm({
    fields: {
      amount: {
        label: 'Enter amount you want to invest',
        isRequired: true,
        validate: validateAmount,
      }
    },
    onSubmit: async ({ values }) => {
      try {
        await SmcService.contractUSDT.approve(values.amount);

        const allowance = await SmcService.contractUSDT.allowance();
        if (allowance !== values.amount) throw new Error('Your amount is not approved');

        const transaction = await SmcService.contractMAIN.deposit(pid, values.amount);
        await SmcService.fetchSMCWallet(store);
        await state.onSuccess();
 
        AppService.createSuccessNoti('Deposit successful.', {
          buttons: [
            {
              label: 'View Transaction',
              onClick: () => window.open(SmcService.getLinkTransactionByHash(transaction.transactionHash))
            }
          ]
        });

        configs.offModal();

      } catch (error) {
        console.log(JSON.stringify(error));
        AppService.createErrNoti(error.message);
      }
    }
  })

  return <>
    <div className="UserBalance">
      <span className="icon">
        <Icon.Wallet />
      </span>
      <span className="label">Your balance</span>
      <span className="value">
        {function () {
          if (isFetching) return <Icon.Loading />
          if (error) return '--'
          return `${balanceUSDT.toLocaleString(getLocaleKey(true))} USDT`
        }()}
      </span>
    </div>
    <InputWraper inputProps={inputProps.amount} component={InputNumber} />
    <div className="ctas">
      <Button label="Invest" onClick={handleSubmit} isLoading={isSubmitting} />
    </div>
  </>
})