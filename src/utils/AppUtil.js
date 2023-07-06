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

export const convertSnakeCaseToTitleCase = (str) => {
  const words = str.split("_");
  const transformedWords = words.map((word) => {
    if (word.toLowerCase().includes("ar")) {
      return "Arabic";
    } else if (word.toLowerCase().startsWith("is")) {
      return word.slice(2);
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  });
  return transformedWords.join(" ").trim();
};
