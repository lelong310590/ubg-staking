import {FC} from 'react'
import {ClassNames, InputProps} from '../../../modules'

interface Props extends InputProps {
    options: { value: any, label: string }[]
}

export const InputTagSelect: FC<Props> = (props) => {
    return (
        <div className="InputTagSelect">
            {props.options.map((item, key) => {
                return (
                    <div
                        key={key}
                        className={ClassNames({item: true, active: props.value === item.value})}
                        onClick={() => props.onChange(item.value)}
                    >
                        {item.label}
                    </div>
                )
            })}
        </div>
    )
}