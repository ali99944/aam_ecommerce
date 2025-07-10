import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from './auth_reducer'
import CartReducer from './cart_reducer'
import SettingsReducer from './settings_reducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  cart: CartReducer,
  settings: SettingsReducer
});

export default rootReducer