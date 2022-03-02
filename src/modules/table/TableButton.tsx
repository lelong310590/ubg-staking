import { FC } from 'react'
import { ClassNames } from '../utils'

interface Props {
  label: any,
  onClick: () => any,
  isVisible?: boolean,
  className?: string,
}

export const TableButton: FC<Props> = (props) => {
  if (!props.isVisible) return null
  return (
    <button
      className={ClassNames({ Table__Button: true, [props.className as string]: !!props.className })}
      onClick={() => props.onClick()}
    >
      {props.label}
    </button>
  )
}

TableButton.defaultProps = {
  isVisible: true
}