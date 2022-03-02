import { FC, useState, CSSProperties, SyntheticEvent } from 'react'

import { ClassNames } from '../../modules/utils';
import { Icon } from '../icon';

export type TButtonStyleType = 'success' | 'primary' | 'info' | 'danger' | 'warning' | 'dark' | 'success-outline'
    | 'primary-outline' | 'info-outline' | 'danger-outline' | 'warning-outline' | 'dark-outline' | 'grey' | 'grey-outline';
export type TButtonType = 'button' | 'submit' | 'reset'

export interface IButtonProps {
    isVisible?: boolean,
    label: any,
    onClick?: any,
    isMiddle?: boolean,
    style?: CSSProperties,
    type?: TButtonType,
    buttonType?: TButtonStyleType,
    isLoading?: boolean,
    className?: string,
    disabled?: boolean,
    icon?: () => any,
}

const Wraper: any = (props: any) => {
    if (props.isMiddle) return <div className="Button_Wraper_Middle">
        {props.children}
    </div>
    return props.children
}

export const Button: FC<IButtonProps> = ({ isVisible, label, type, onClick, isMiddle, style, buttonType, isLoading, className, disabled, icon }) => {
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const loading = isButtonLoading || isLoading;

    const buttonClassName = ClassNames({
        Button: true,
        middle: isMiddle,
        loading: !!loading,
        [buttonType as string]: !!buttonType,
        [className as string]: !!className,
    })

    const handleClick = async (e?: SyntheticEvent) => {
        if (isButtonLoading || disabled) return;
        if (e) e.preventDefault();
        const isAsyncFunction = onClick instanceof (async () => {}).constructor;
        if (isAsyncFunction && typeof isLoading !== 'boolean') setIsButtonLoading(true);
        await onClick();
        if (isAsyncFunction && typeof isLoading !== 'boolean') setIsButtonLoading(false);
    }

    if (!isVisible) return null

    return (
        <Wraper isMiddle={isMiddle}>
            {(() => {
                if (onClick) return <button disabled={disabled} style={style} type={type} className={buttonClassName} onClick={handleClick}>
                    {icon ? icon() : null}

                    <span className="label">
                        {label}
                    </span>

                    {loading ? <div className="iconLoading">
                        <Icon.Loading />
                    </div> : null}
                </button>

                return <button disabled={disabled} style={style} type={type} className={buttonClassName}>
                    {icon ? icon() : null}

                    <span className="label">
                        {label}
                    </span>

                    {loading ? <div className="iconLoading">
                        <Icon.Loading />
                    </div> : null}
                </button>
            })()}
        </Wraper>
    )
}

Button.defaultProps = {
    isVisible: true,
    isMiddle: false,
    type: 'button',
    buttonType: 'primary',
}