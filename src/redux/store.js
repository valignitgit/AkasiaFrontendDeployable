import { configureStore } from "@reduxjs/toolkit";
import bankReducer from "./slices/bankSlice";
import portfolioReducer from "./slices/portfolioSlice";
import securityReducer from "./slices/securitySlice";
import portfolioSecurityReducer from "./slices/portfolioSecuritySlice";
import securityTableSlice from "./slices/securityTableSlice";
import currencySlice from "./slices/currencySlice";

export const store = configureStore({
    reducer: {
        bank: bankReducer,
        portfolio: portfolioReducer,
        security: securityReducer,
        portfolioSecurity: portfolioSecurityReducer,
        securityTableData: securityTableSlice,
        currency: currencySlice,
    },
});
