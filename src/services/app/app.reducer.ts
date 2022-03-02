import { IDevice } from "../../AppTypes";

interface State {
  device: IDevice,
}

const defaultState = {
  device: {},
} as State

export const SET_APP_CLIENT_DEVICE_INFORMATION = 'SET_APP_CLIENT_DEVICE_INFORMATION';

export const appReducer = (state = defaultState, action: any): State => {
  const { type, data } = action;
  if (type === SET_APP_CLIENT_DEVICE_INFORMATION) return { ...state, device: data }
  return state;
}