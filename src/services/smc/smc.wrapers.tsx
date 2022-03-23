import {FC} from "react";
import {useSelector} from "../../AppStores";
import {Button, Icon, Message} from "../../components";
import {SmcService} from "./smc.service";
import {isMobile} from 'react-device-detect';

const openTrust = () => {
    window.open('trust://browser_enable', "_blank") //to open new page
}

export const withSmcWalletWraper = (Component: FC<any>) => (props: any) => {
    const Cpn = withSmcWraper(() => {
        const {address, isFetching, error} = useSelector(state => state.smcWallet);

        if (isFetching) return <div className="SMCWraper">
            <Icon.Loading/>
        </div>

        if (error) return <div className="SMCWraper">
            <Message type="ERROR" content={error}/>
        </div>

        if (!address) return (
            <div className="SMCWraper">
                <div className="smc-waller-list">
                    <img src="/images/meta-mask-logo.png" alt="" className="logo"/>
                    {isMobile &&
                        <img src="/images/trust-logo.png" alt="" className="logo" onClick={() => openTrust()}/>
                    }
                </div>
                <div className="title">Your wallet must be connect with UBG Staking.</div>
                <Button label="Connect wallet" onClick={() => SmcService.handleConnectWallet()}/>
            </div>
        )

        return <Component {...props} />
    })

    return <Cpn/>
}

export const withSmcWraper = (Component: FC<any>) => (props: any) => {
    const {status, error} = useSelector(state => state.smc);

    if (status === 'NONE') return <div className="SMCWraper">
        <Icon.Loading/>
    </div>

    if (status === 'ERROR') return <div className="SMCWraper">
        <Message type="ERROR" content={error}/>
    </div>

    if (status === 'META_MASK_NOT_INSTALLED') return <div className="SMCWraper">
        <img src="/images/meta-mask-logo.png" alt="" className="logo"/>
        <div className="title">Meta Mask extension must be installed.</div>
        <Button label="Install" onClick={() => window.open('https://metamask.io')}/>
    </div>

    return <Component {...props} />
}