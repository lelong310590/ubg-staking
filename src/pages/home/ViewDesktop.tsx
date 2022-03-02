import { FC } from 'react'
import { Header } from '../../components'
import { Footer } from '../../components/blocks/footer'
import { SectionHead, SectionBank } from './components'

export const ViewDesktop: FC = () => {
  return (
    <>
      <Header />
      <SectionHead />
      {/* <SectionFarming /> */}
      <SectionBank />
      <Footer />
    </>
  )
}