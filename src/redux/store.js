import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import bankReducer from "./slices/bankSlice";
import brokerReducer from "./slices/brokerSlice";
import countryReducer from "./slices/countrySlice";
import currencyReducer from "./slices/currencySlice";
import exchangeReducer from "./slices/exchangeSlice";
import layoutReducer from "./slices/layoutSlice";
import portfolioSecurityReducer from "./slices/portfolioSecuritySlice";
import portfolioReducer from "./slices/portfolioSlice";
import securityReducer from "./slices/securitySlice";
import securityTableReducer from "./slices/securityTableSlice";

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
    country: countryReducer,
    broker: brokerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
