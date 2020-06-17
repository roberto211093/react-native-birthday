export const validateEmail = email => {
  // eslinteslint-comments/no-unlimited-disable
  const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailValid.test(email);
};
