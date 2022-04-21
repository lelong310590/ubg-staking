import {FC} from 'react'
import {Link} from 'react-scroll'
import NextLink from 'next/link'
import {useSelector} from '../../../AppStores'
import {Button} from '../../button'
import {Icon} from '../../icon'
import {UserAffiliateBox} from '../user-affiliate-box'
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

interface Props {
    isIDOPage?: boolean
}

const connectWallet = async () => {
    console.log("MMM1: connectWallet");
    const providerOptions = {
        /* See Provider Options Section */
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: "460f40a260564ac4a4f4b3fffb032dad", // required,
            },
            qrcode: true,
        }
    };
    console.log("MMM2 ", providerOptions);

    const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
    });
    console.log("MMM2-1 ", web3Modal);

    const provider = await web3Modal.connect()

    console.log("MMM2-2 ", provider);

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts: string[]) => {
        console.log("MMM3: accountsChanged");
        window.location.reload
    });

    provider.on("chainChanged", (chainId: number) => {
        console.log(chainId);
    });

    provider.on("connect", (info: { chainId: number }) => {
        console.log('info: ', info)
    });

    provider.on("disconnect", (error: { code: number; message: string }) => {
        console.log("MM 2: disconnect");
        window.location.reload
    });
}

export const Header: FC<Props> = (props) => {
    const {address} = useSelector(state => state.smcWallet);
    return (
        <header className="Header">
            <div className="container">
                <div className="content">
                    <NextLink href="https://ubgtoken.com">
                        <a>
                            <img src="/images/logo-white.png" alt="" className="logo"/>
                        </a>
                    </NextLink>

                    {props.isIDOPage ? <>
                    </> : <div className="nav">
                        <Link to="SectionHead" activeClass="active" className="item" offset={-100} spy={true}
                              smooth={true} duration={500}>INTRODUCE</Link>
                        {/* <Link to="SectionFarming" activeClass="active" className="item" offset={-50} spy={true} smooth={true} duration={500}>FARMING</Link> */}
                        <Link to="SectionBank" activeClass="active" className="item" offset={-50} spy={true}
                              smooth={true} duration={500}>Staking</Link>

                        {/* <NextLink href="/ido">
              <a className="item">
                IDO & Airdrop
              </a>
            </NextLink> */}

                        <a href="https://ubgtoken.com/" className="item">
                            Home
                        </a>


                        {/* <div className="item"> */}
                        {/* DOCS */}
                        {/* </div> */}
                    </div>}

                    <div className="rightContent">
                        {!!address ? <UserAffiliateBox/> : <Button
                            label="My Wallet"
                            icon={Icon.Wallet}
                            onClick={() => connectWallet()}
                        />}
                    </div>
                </div>
            </div>
        </header>
    )
}