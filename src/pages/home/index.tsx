import { AppService } from '../../services'
import { ViewDesktop } from './ViewDesktop'

export const HomePage = AppService.renderPage({
  className: 'HomePage',
  desktop: ViewDesktop,
  mobile: ViewDesktop,
})