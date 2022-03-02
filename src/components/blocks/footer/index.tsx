import { FC } from 'react'
import { Icon } from '../../icon'

export const Footer: FC = () => {
  return (
    <footer className="Footer">
      <div className="social">
        <a href="https://www.facebook.com/UBGToken/">
          <Icon.Facebook />
          <span className="label">Facebook</span>
        </a>
        <a href="https://t.me/UBG_Token">
          <Icon.Telegram />
          <span className="label">UBG Token Group</span>
        </a>
        <a href="https://t.me/UBGTokenChannel">
          <Icon.Telegram />
          <span className="label">UBG Token Channel</span>
        </a>
        <a href="https://twitter.com/UBGToken">
          <Icon.Twitter />
          <span className="label">Twitter</span>
        </a>
      </div>
    </footer>
  )
}