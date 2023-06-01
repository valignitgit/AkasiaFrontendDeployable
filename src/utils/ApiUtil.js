// credentials.js
const USER_CREDENTIALS_KEY = "userCredentials";

export const setUserCredentials = (userId, password) => {
  const userCredentials = {
    user_id: userId,
    password: password,
  };
  localStorage.setItem(USER_CREDENTIALS_KEY, JSON.stringify(userCredentials));
};

export const getUserCredentials = () => {
  const storedCredentials = localStorage.getItem(USER_CREDENTIALS_KEY);
  return storedCredentials ? JSON.parse(storedCredentials) : null;
};
