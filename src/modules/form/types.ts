import { FormikHelpers } from "formik";
import { FC } from "react";
import { ILocale } from "../types";

export type FormFieldValidate = (currentValue: any, fieldValues: any) => string | { [locale: string]: any } | void;

export interface FormField {
  label?: string,
  description?: string,
  isDisabled?: boolean,
  isVisible?: boolean,
  isRequired?: boolean,
  defaultValue?: any,
  isMutilLocale?: boolean,
  validate?: FormFieldValidate,
  exProps?: any,
}

export interface FormValues {
  [fieldName: string]: FormField;
}

export interface FormInputProps {
  fieldName: string,
  label: any,
  description: string,
  isDisabled: boolean,
  isVisible: boolean,
  isRequired: boolean,
  value: any,
  onChange: (newValue: any) => void,
  isMutilLocale: boolean,
  locales: ILocale[],
  error?: any,
  onTouch?: () => void,
  exProps?: any
}

export interface FormOnSubmitArgs<Fields> {
  values: { [K in keyof Fields]: any },
  formikHelpers: FormikHelpers<any>
}


export interface FormConfigs<Fields> {
  fields: Fields,
  onSubmit: (args: FormOnSubmitArgs<Fields>) => void | Promise<any>
  enableReinitialize?: boolean,
  locales?: ILocale[],
}

export interface FormState<Fields> {
  values: { [K in keyof Fields]: any },
  inputProps: { [K in keyof Fields]: FormInputProps },
  isSubmitting: boolean,
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void,
  formikHelpers: FormikHelpers<any>,
}

export interface InputWraperProps {
  inputProps: FormInputProps,
  className?: string,
  component?: FC<InputProps>,
  render?: (props: InputProps) => any,
}

export interface InputProps {
  value: any,
  onChange: (newValue: any) => void,
  isDisabled?: boolean,
  onTouch?: () => void,
}