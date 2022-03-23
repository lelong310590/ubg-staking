import {FC} from 'react'
import {getLocaleKey} from '../../AppLanguages';
import {useSelector} from '../../AppStores';
import {withSmcWalletWraper} from '../../services';
import {withModalWraper} from '../modalWraper'

export let OnModalWallet = () => {
}
export const ModalWallet: FC = withModalWraper({
    title: 'My Wallet',
    className: 'ModalWallet',
    bind: (configs) => {
        OnModalWallet = () => configs.onModal()
    }
})(() => {
    const Cpn = withSmcWalletWraper(() => {
        const {balanceUSDT, balanceNCF} = useSelector(state => state.smcWallet);
        return <>
            <div className="numberReports">
                <div className="item">
                    <div className="label">Balance USDT</div>
                    <div className="value">{balanceUSDT.toLocaleString(getLocaleKey(true))}</div>
                </div>
                <div className="item">
                    <div className="label">Balance NCF</div>
                    <div className="value">{balanceNCF.toLocaleString(getLocaleKey(true))}</div>
                </div>
            </div>
        </>
    })

    return <Cpn/>
});

