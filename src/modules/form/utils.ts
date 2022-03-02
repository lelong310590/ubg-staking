import { useFormik } from "formik";
import moduleConfig from "../../module.config";
import { ILocale } from "../types";
import { ObjectUtils } from "../utils";
import { FormConfigs, FormInputProps, FormState, FormValues, FormField } from "./types";

export function useForm<Fields extends FormValues>(configs: FormConfigs<Fields>): FormState<Fields> {
  const { fields, onSubmit } = configs;
  const locales: ILocale[] = configs.locales || moduleConfig.getLocaleList();

  const validateRequired = (value: any): any => {
    return ((value === '') || (Array.isArray(value) && !value.length)) ? moduleConfig.translate('must-be-provided') : '';
  }

  const initialValues = Object.keys(fields).reduce((output: any, fieldName: string) => {
    const defaultValue = fields[fieldName].defaultValue;

    // Mutil locale field
    if (fields[fieldName].isMutilLocale) {
      output[fieldName] = locales.reduce((output: any, item) => {
        output[item.key] = defaultValue && defaultValue[item.key] ? defaultValue[item.key] : '';
        return output;
      }, {});
    }

    // Normal field
    else output[fieldName] = defaultValue || '';

    return output;
  }, {});

  const validate = (currentValues: any) => {
    return Object.keys(fields).reduce((output: any, fieldName: string) => {
      const field = fields[fieldName] as FormField;
      const currentValue = currentValues[fieldName];

      let error;

      // Handle required case
      if (field.isRequired) {
        // Mutil locale
        if (field.isMutilLocale) {
          error = ObjectUtils.cleanObj(locales.reduce((output: any, item) => {
            output[item.key] = validateRequired(currentValue[item.key]);
            return output;
          }, {}));

        } else {
          // One locale
          error = validateRequired(currentValue);
        }
      }

      // Handle validate function
      if (!error && field.validate) error = field.validate(currentValue, currentValues);

      if (error && ObjectUtils.isHasValue(error)) output[fieldName] = error;
      return output;
    }, {})
  }

  const formikState = useFormik({
    enableReinitialize: !!configs.enableReinitialize,
    initialValues,
    validate,
    onSubmit: async (values, formikHelpers) => {
      try {
        await onSubmit({ values, formikHelpers })
      } catch (error) {
        if (error.errors) formikHelpers.setErrors(error.errors);
      }
    }
  });

  const inputProps = Object.keys(fields).reduce((output: any, fieldName: string) => {
    const structureItem = fields[fieldName];
    const inputPropsItem: FormInputProps = {
      fieldName,
      label: structureItem.label || fieldName,
      description: structureItem.description || '',
      isDisabled: formikState.isSubmitting || structureItem.isDisabled || false,
      isVisible: structureItem.isVisible || true,
      isRequired: !!structureItem.isRequired,
      isMutilLocale: structureItem.isMutilLocale || false,
      value: formikState.values[fieldName],
      onChange: (newValue: any) => {
        if (!formikState.isSubmitting && !structureItem.isDisabled) {
          return formikState.setFieldValue(fieldName, newValue);
        }
      },
      error: formikState.touched[fieldName] && formikState.errors[fieldName],
      exProps: structureItem.exProps,
      onTouch: () => {
        if (!formikState.touched[fieldName]) setTimeout(() => {
          formikState.setFieldTouched(fieldName, true)
        }, 100);
      },
      locales,
    }
    output[fieldName] = inputPropsItem;
    return output;
  }, {})

  const handleSubmit = async (e: any) => {
    if (e) e.preventDefault();
    if (!formikState.isSubmitting) formikState.handleSubmit();
  }

  return {
    isSubmitting: formikState.isSubmitting,
    values: formikState.values,
    inputProps,
    handleSubmit,
    formikHelpers: formikState
  }
}