import { FC, useState, useEffect } from 'react'

import { InputProps } from '../../../modules/form/types';
import { ClassNames } from '../../../modules/utils';

export interface IInputCheckboxProps extends InputProps {
  type?: 'checkbox' | 'radio',
  label: string,
}

export const InputCheckbox: FC<IInputCheckboxProps> = (props) => {
  const { label, onChange, type } = props;
  const [value, setValue] = useState(!!props.value);

  useEffect(() => {
    if (typeof props.value === 'boolean') setValue(props.value);
  }, [props.value])

  return (
    <div
      onClick={() => {
        if (props.isDisabled) return;
        setValue(!value);
        onChange(!value);
      }}
      className={ClassNames({
        InputCheckbox: true,
        checked: !!value,
        [type as string]: !!type,
        disabled: props.isDisabled
      })}
    >
      <div className="icon">
        <svg viewBox="0 0 11 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <path d="M0.12,4.4 C0.04,4.32 0,4.2 0,4.12 C0,4.04 0.04,3.92 0.12,3.84 L0.68,3.28 C0.84,3.12 1.08,3.12 1.24,3.28 L1.28,3.32 L3.48,5.68 C3.56,5.76 3.68,5.76 3.76,5.68 L9.12,0.12 L9.16,0.12 L9.16,0.12 C9.32,-0.04 9.56,-0.04 9.72,0.12 L10.28,0.68 C10.44,0.84 10.44,1.08 10.28,1.24 L10.28,1.24 L3.88,7.88 C3.8,7.96 3.72,8 3.6,8 C3.48,8 3.4,7.96 3.32,7.88 L0.2,4.52 L0.12,4.4 Z" id="Path" fill="#546E7A" fillRule="nonzero" />
          </g>
        </svg>
      </div>

      {label ? <div className="label">
        {label}
      </div> : null}
    </div>
  )
}

InputCheckbox.defaultProps = {
  type: 'checkbox',
}