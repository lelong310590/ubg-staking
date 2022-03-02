import { FC } from 'react'
import { OnModalPoolDetail } from '../../../modals'
import { Pool } from '../../../services'
import { Button } from '../../button'

export const PoolCard: FC<{ data: Pool }> = ({ data }) => {
  return (
    <div className="PoolCard">
      <div className="avatar">
        <img src="/images/pool.png" alt="" className="" />
      </div>
      <div className="rowInfo">
        <div className="label">PID</div>
        <div className="value">{data.pid}</div>
      </div>
      <div className="rowInfo">
        <div className="label">UBU-WBNB Cake-LP</div>
        <div className="value">--</div>
      </div>
      <div className="rowInfo">
        <div className="label">Earn</div>
        <div className="value">--</div>
      </div>
      <div className="rowInfo">
        <div className="label">APY</div>
        <div className="value">--</div>
      </div>
      <div className="rowInfo">
        <div className="label">TVL</div>
        <div className="value">--</div>
      </div>

      <div className="ctas">
        <Button label="Select" onClick={() => OnModalPoolDetail({ pid: data.pid })} />

        {/* <p className="note">
          View on BSC Scan
          <Icon.Visible />
        </p> */}
      </div>
    </div>
  )
}