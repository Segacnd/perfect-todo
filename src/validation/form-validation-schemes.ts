export const loginRules = {
  latinPattern: /((?=.*[a-z]){1})|((?=.*[A-Z]){1})/,
};
export const emailRules = {
  mailPattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
};
export const passwordRules = {
  passwordPattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
};
