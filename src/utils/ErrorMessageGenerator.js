const ErrorMessageGenerator = {
  getMandatoryFieldMessage: (fieldName) => `The ${fieldName} is required.`,
  getStringInArabicMessage: (fieldName) =>
    `The ${fieldName} Should be in  Arabic.`,
  getValueInNumberMessage: (fieldName) => `The ${fieldName} Should be Number.`,
  getDecimalPointValueMessage: (fieldName) =>
    `${fieldName} must have one or two decimal places`,
  getIbaNumberMessage: (fieldName) =>
    `The ${fieldName} should have 24 characters alphabetic long and must start from SA`,
  getThreeDigitNumberMessage: (fieldName) =>
    `The ${fieldName} should have three digits Number`,
};

export default ErrorMessageGenerator;
