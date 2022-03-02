import { FC } from 'react'
import { InputProps } from '../../../modules/form/types'

interface Props extends InputProps {
  placeholder?: string,
  onBlur?: (value: any) => void
}

export const InputText: FC<Props> = ({ onChange, value, placeholder }) => {
  return (
    <input
      type="text"
      onChange={e => onChange(e.target.value)}
      value={value}
      placeholder={placeholder}
    />
  )
}