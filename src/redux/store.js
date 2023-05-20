import { configureStore } from "@reduxjs/toolkit";
import bankReducer from "./slices/bankSlice";
import portfolioReducer from "./slices/portfolioSlice";
import securityReducer from "./slices/securitySlice";
import portfolioSecurityReducer from "./slices/portfolioSecuritySlice";
import securityTableReducer from "./slices/securityTableSlice";
import currencyReducer from "./slices/currencySlice";
import layoutReducer from "./slices/layoutSlice";
import authReducer from "./slices/authSlice";
import exchangeReducer from "./slices/exchangeSlice";

export const store = configureStore({
  reducer: {
    bank: bankReducer,
    portfolio: portfolioReducer,
    security: securityReducer,
    portfolioSecurity: portfolioSecurityReducer,
    securityTableData: securityTableReducer,
    currency: currencyReducer,
    layout: layoutReducer,
    auth: authReducer,
    exchange: exchangeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
