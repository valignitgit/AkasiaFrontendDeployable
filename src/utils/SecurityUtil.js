export const getSecurityTypeList = () => {
    return ["Stock", "Bond", "Real Estate", "Sukuk", "Murabaha", "Commodity"];
};
export const getCurrencyList = (currencyArray) => {
    return currencyArray.map((currency) => currency.currency_id);
};
