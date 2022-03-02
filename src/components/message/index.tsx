import React, { FC } from 'react'
import { ClassNames } from '../../modules/utils'

interface Props {
  content: string,
  className?: string,
  type?: MessageType
}

type MessageType = 'INFO' | 'ERROR'

export const Message: FC<Props> = (props) => {
  return (
    <div className={ClassNames({ Message: true, [props.type]: true, [props.className]: !!props.className })}>
      {props.content}
    </div>
  )
}

Message.defaultProps = {
  type: 'INFO'
}