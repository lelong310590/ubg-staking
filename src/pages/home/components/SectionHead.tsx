import { FC } from 'react'
import { Element } from 'react-scroll'
// import { getLocaleKey } from '../../../AppLanguages';
import { useSelector } from '../../../AppStores'
// import { Icon } from '../../../components';

export const SectionHead: FC = () => {
  return (
    <Element name="SectionHead">
      <section className="SectionHead">
        <div className="container">
          <div className="banner">
            <div className="info">
              <h1 className="sectionTitle">UBG Token was borned for a mission:</h1>
              <p className="sectionExcerpt">UBG Token was borned for a mission: Breaking through all limits of Payment by Crypto Currencies wherever and whenever. We create a new payment method for E- Commercial and Travel, making it faster, transparent, profitable, secure and great in future..</p>
            </div>
            <img src="/images/head.png" alt="" />
          </div>
        </div>
      </section>
    </Element>
  )
}