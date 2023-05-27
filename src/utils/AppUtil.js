export const getEmptyErrorState = () => ({
  errorMessage: "",
  errorState: null,
});

export const getCurrencyList = (currencyArray) => {
  return currencyArray.map((currency) => currency.currency_id);
};
