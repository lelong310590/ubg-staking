import { FC } from "react";

import moduleConfig from "../../module.config";
import { ClassNames } from "../utils";
import { InputProps, InputWraperProps } from './types';

export const InputWraper: FC<InputWraperProps> = ({ inputProps, component: Component, className, render }) => {
  const {
    fieldName,
    label,
    isDisabled,
    isMutilLocale,
    isVisible,
    isRequired,
    value,
    onChange,
    error,
    locales,
    description,
    exProps,
    onTouch,
  } = inputProps;

  if (!isVisible) return null

  return (
    <div className={ClassNames({
      InputWraper: true,
      hasMutilLocale: isMutilLocale,
      disabled: isDisabled,
      [className as string]: !!className
    })}>
      <label htmlFor={fieldName}>
        {label} {!isRequired && !isDisabled && <span className="tagOptional">- {moduleConfig.translate('optional')}</span>}
      </label>
      <br />

      {!!description && <>
        <span className="description">
          {description}
        </span>
        <br />
      </>}

      {(() => {
        if (isMutilLocale) {
          return locales.map((locale, localeIndex) => {
            const errorMessage = typeof error === 'object' && error[locale.key];
            return (
              <div
                key={localeIndex}
                className={ClassNames({
                  inputSection: true,
                  hasError: !!errorMessage
                })}
              >
                <div className="input">
                  <div className="locale">
                    <div className="name">{locale.label}</div>
                  </div>
                  {function () {
                    const inputProps: InputProps = {
                      isDisabled,
                      value: value[locale.key],
                      onTouch,
                      onChange: (newValue) => onChange({ ...value, [locale.key]: newValue }),
                      ...exProps
                    }

                    if (render) return render(inputProps)
                    if (Component) return <Component {...inputProps} />
                  }()}
                </div>
                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
              </div>
            )
          })
        }

        const errorMessage = error;

        return <div className={ClassNames({ inputSection: true, hasError: !!errorMessage })}>
          <div className="input">
            {function () {
              const inputProps: InputProps = {
                isDisabled,
                value,
                onChange: onChange,
                onTouch,
                ...exProps
              }

              if (render) return render(inputProps)
              if (Component) return <Component {...inputProps} />
            }()}
          </div>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </div>
      })()}
    </div>
  )
}