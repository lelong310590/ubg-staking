import { FC } from 'react'
import { Link } from 'react-scroll'
import NextLink from 'next/link'
import { useSelector } from '../../../AppStores'

import { OnModalWallet } from '../../../modals'
import { Button } from '../../button'
import { Icon } from '../../icon'
import { UserAffiliateBox } from '../user-affiliate-box'

interface Props {
  isIDOPage?: boolean
}

export const Header: FC<Props> = (props) => {
  const { address } = useSelector(state => state.smcWallet);
  return (
    <header className="Header">
      <div className="container">
        <div className="content">
          <NextLink href="/" >
            <a>
              <img src="/images/logo-white.png" alt="" className="logo" />
            </a>
          </NextLink>

          {props.isIDOPage ? <>
          </> : <div className="nav">
            <Link to="SectionHead" activeClass="active" className="item" offset={-100} spy={true} smooth={true} duration={500}>INTRODUCE</Link>
            {/* <Link to="SectionFarming" activeClass="active" className="item" offset={-50} spy={true} smooth={true} duration={500}>FARMING</Link> */}
            <Link to="SectionBank" activeClass="active" className="item" offset={-50} spy={true} smooth={true} duration={500}>Staking</Link>

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
            {!!address ? <UserAffiliateBox /> : <Button
              label="My Wallet"
              icon={Icon.Wallet}
              onClick={() => OnModalWallet()}
            />}
          </div>
        </div>
      </div>
    </header>
  )
}