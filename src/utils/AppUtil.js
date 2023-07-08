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

export const shouldRenderRadioButtons = (propertyName) => {
  const radioProperties = [
    "is_income_business",
    "is_income_employment",
    "is_income_family",
    "is_income_inheritance",
    "is_income_business",
    "is_income_invest",
    "is_income_savings",
    "is_statutory_info_1",
    "is_statutory_info_2",
    "is_statutory_info_3",
    "is_statutory_info_4",
    "is_statutory_info_5",
  ];
  return radioProperties.includes(propertyName);
};
