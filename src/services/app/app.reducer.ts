import {IDevice} from "../../AppTypes";
import language from './../../../lang/lang.json'

interface State {
    device: IDevice,
    lang: any
}

const defaultState = {
    device: {},
    lang: language.en
} as State

export const SET_APP_CLIENT_DEVICE_INFORMATION = 'SET_APP_CLIENT_DEVICE_INFORMATION';
export const SET_APP_LANGUAGE = 'SET_APP_LANGUAGE';

export const appReducer = (state = defaultState, action: any): State => {
  const {type, data} = action;
  if (type === SET_APP_CLIENT_DEVICE_INFORMATION) return {...state, device: data}
  if (type === SET_APP_LANGUAGE) return {...state, lang: data}
  return state;
}