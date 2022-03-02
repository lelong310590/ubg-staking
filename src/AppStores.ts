import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { isDev } from './AppConfigs'

import { appReducer } from './services/app/app.reducer'
import { smcReducer } from './services/smc/smc.reducer'
import { smcWalletReducer } from './services/smc/smcWallet.reducer'
import { smcPoolsReducer } from './services/smc/smcPools.reducer'
import { idoReducer } from './services/smc/ido.reducer'

export const combinedReducer = combineReducers({
  app: appReducer,

  smc: smcReducer,
  smcWallet: smcWalletReducer,
  smcPools: smcPoolsReducer,

  ido: idoReducer
})

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    let nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (state.smc.status === 'READY') nextState.smc = state.smc;
    return nextState
  } else {
    return combinedReducer(state, action);
  }
}

export const makeStore: MakeStore = () => createStore(
  reducer,
  isDev && composeWithDevTools(applyMiddleware())
);

export const wrapper = createWrapper(makeStore)

export type RootState = ReturnType<typeof combinedReducer>
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export type StoreAction = {
  type: string,
  [name: string]: any
}
