export const isEmptyValue = (value) => {
    return value === "" || value === null;
};

export const isEmptyString = (str) => {
    return typeof str === "string" && str.trim() === "";
};

export const isArabic = (str) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return !arabicRegex.test(str);
};

export const isFloatNumber = (value) => {
    return isNaN(parseFloat(value));
};

//for 1 or 2 decimal points
export const isValidDecimalPointValue = (value) => {
    return !/^\d+\.\d{1,2}$/.test(value);
};
