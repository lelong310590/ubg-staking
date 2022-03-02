import { FC } from 'react'
import { Element } from 'react-scroll'
// import { getLocaleKey } from '../../../AppLanguages';
import { useSelector } from '../../../AppStores'
// import { Icon } from '../../../components';

export const SectionHead: FC = () => {
  const { balanceNCF, isFetching, error } = useSelector(state => state.smcWallet);

  return (
    <Element name="SectionHead">
      <section className="SectionHead">
        <div className="container">
          <div className="banner">
            <div className="info">
              <h1 className="sectionTitle">Binance Smart Chain</h1>
              <p className="sectionExcerpt">Cum montes pellentesque facilisi, inceptos non! Felis dolorum voluptatum. Accusantium, class lorem venenatis esse, egestas</p>
            </div>
            <img src="/images/head.png" alt="" />
          </div>

          {/* <div className="numberReports">
            <div className="row">
              <div className="col-sm-3">
                <div className="item">
                  <div className="label">Balance</div>
                  <div className="value">
                    {function () {
                      if (isFetching) return <Icon.Loading />
                      if (error || !!!balanceNCF) return '--';
                      return `${balanceNCF.toLocaleString(getLocaleKey(true))} NCF`
                    }()}
                  </div>
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
                  <div className="label">TVL</div>
                  <div className="value">--</div>
                </div>
              </div>

              <div className="col-sm-3">
                <div className="item">
                  <div className="label">Price Token</div>
                  <div className="value">--</div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </Element>
  )
}