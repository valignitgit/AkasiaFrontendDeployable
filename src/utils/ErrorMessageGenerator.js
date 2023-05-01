const ErrorMessageGenerator = {
    getMandatoryFieldMessage: (fieldName) => `The ${fieldName} is required.`,
    getStringInArabicMessage: (fieldName) =>
        `The ${fieldName} Should be in  Arabic.`,
    getValueInNumberMessage: (fieldName) => `The ${fieldName} Should be Number.`,
    getDecimalPointValueMessage: (fieldName) =>
        `${fieldName} must have one or two decimal places`,
};

export default ErrorMessageGenerator;
