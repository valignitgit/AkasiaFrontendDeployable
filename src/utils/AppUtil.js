export const getEmptyErrorState = () => ({
  errorMessage: "",
  errorState: null,
});

export const getCurrencyList = (currencyArray) => {
  return currencyArray.map((currency) => currency.currency_id);
};

export const getListByKey = (array, key) => array.map((item) => item[key]);

export const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2JpbGVVc2VyQHZhbGlnbml0LmNvbSIsImlhdCI6MTY4NjA0MDIyNH0.yCl0D0q_qq6p5-V80eAJjSLhm41z_n6cDUWoBew-_cI";
