import React, { FC } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';

import { getEnv } from '../../../AppConfigs';
import { translate } from '../../../AppLanguages';
import { AppRoutes } from '../../../AppRoutes';
import { useSelector } from '../../../AppStores';
import { AppService } from '../../../services';
import { Icon } from '../../icon';

export const UserAffiliateBox: FC = () => {
  const { address } = useSelector(state => state.smcWallet);
  const userReferralRegisterLink = `${getEnv('PUBLIC_URL')}${AppRoutes.home.renderPath()}?ref=${address}`;

  return (
    <CopyToClipboard
      text={userReferralRegisterLink}
      onCopy={() => AppService.createSuccessNoti(translate('copied'))}>
      <div className="UserAffiliateBox">
        <span className="icon">
          <Icon.Affiliate />
        </span>
        <span className="value">
          {userReferralRegisterLink}
        </span>
        <span className="btnCopy">
          <Icon.Copy />
        </span>
      </div>
    </CopyToClipboard>
  )
}