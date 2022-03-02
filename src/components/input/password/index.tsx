import { FC, useState, Fragment } from 'react'

import { InputProps } from '../../../modules/form/types'
import { Icon } from '../../../modules/icon'

export const InputPassword: FC<InputProps> = (props) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)

  return (
    <Fragment>
      <input
        className="InputPassword"
        value={props.value || ''}
        readOnly={props.isDisabled}
        type={isVisiblePassword ? 'text' : 'password'}
        onChange={e => props.onChange(e.target.value)}
        autoComplete="off"
      />

      {props.value ? <div className="InputPassword_ToggleVisible" onClick={() => setIsVisiblePassword(state => !state)}>
        {isVisiblePassword ? <Icon.Invisible /> : <Icon.Visible />}
      </div> : null}
    </Fragment>
  )
}