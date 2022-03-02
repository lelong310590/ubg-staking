import { isEqual } from "./main.utils"
import { ObjectUtils } from "./object.utils";

export function memoEqual(prevProps: any, nextProps: any) {
  try {
    return isEqual(prevProps, nextProps);
  } catch (error) {
    return false
  }
}

export const memoMiddleware = (fieldPathForceUpdate: string) => (prevProps: any, nextProps: any) => {
  try {
    if (
      ObjectUtils.getIn(prevProps, fieldPathForceUpdate) === true
      && ObjectUtils.getIn(nextProps, fieldPathForceUpdate) === true
    ) return false

    return isEqual(prevProps, nextProps);
  } catch (error) {
    return false
  }
}