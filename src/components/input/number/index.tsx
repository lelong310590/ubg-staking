import React, { FC } from 'react'
import NumberFormat from 'react-number-format';

import { ELocale } from '../../../AppTypes';
import { getLocaleKey } from '../../../AppLanguages';
import { InputProps } from '../../../modules/form';
import { useSelector } from '../../../AppStores';

export const InputNumber: FC<InputProps> = ({ value, onChange }) => {
  return <InputNumberPure
    value={value}
    onChange={onChange}
  />
}

interface IInputNumberPure {
  value: any,
  onChange: (v: any) => any,
  onTouched?: () => any,
  isDisabled?: boolean
}

export const InputNumberPure: FC<IInputNumberPure> = (props) => {
  const isLocalVN = getLocaleKey() === ELocale.VIETNAM;
  const { isiPhone } = useSelector(state => state.app.device);

  return <NumberFormat
    disabled={!!props.isDisabled}
    thousandSeparator={isLocalVN ? '.' : ','}
    decimalSeparator={isLocalVN ? ',' : '.'}
    value={props.value}
    onValueChange={({ floatValue, value }) => {
      const integer = value.split('.')[0] || '';
      const decimal = value.split('.')[1] || '';
      if (decimal === '000000') return props.onChange(+(`${integer}.00001`));
      if (decimal.length > 6) return props.onChange(+(`${integer}.${decimal.slice(0, 6)}`));
      return props.onChange(floatValue);
    }}
    onBlur={() => props.onTouched && props.onTouched()}
    inputMode={isiPhone ? 'text' : 'numeric'}
  />
}