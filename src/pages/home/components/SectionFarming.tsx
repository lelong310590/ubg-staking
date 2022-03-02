import { FC } from 'react'
import { Element } from 'react-scroll'
import { useSelector } from '../../../AppStores'
import { PoolCard, Icon, Message } from '../../../components'
import { withSmcWraper } from '../../../services'

export const SectionFarming: FC = () => {
  return (
    <Element name="SectionFarming">
      <section className="SectionFarming">
        <div className="container">
          <div className="sectionTitle">Farming</div>
          <div className="sectionExcerpt">
            Iste quae ultricies cupiditate error, gravida quisque, etiam! Congue? Minima
          </div>
          <ListPools />
        </div>
      </section>
    </Element>
  )
}

export const ListPools: FC = withSmcWraper(() => {
  const { isFetching, error, data } = useSelector(state => state.smcPools);

  if (isFetching) return <div className="SMCWraper">
    <Icon.Loading />
  </div>

  if (error) return <div className="SMCWraper">
    <Message type="ERROR" content={error} />
  </div>

  return <div className="row">
    {data.map((pool, key) => <div className="col-sm-4" key={key}>
      <PoolCard data={pool} />
    </div>)}
  </div>
})