export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
};

export const IsObject = (data) => {
  if (!IsEqual(typeof data, "object")) return false;
  return true;
};

export const IsObjectHaveValue = (data) => {
  if (!data) return false;

  if (!IsObject(data)) return false;

  if (IsEqual(Object.keys(data).length, 0)) return false;

  return true;
};

export const ArrayHaveValues = (arr) => {
  if (arr?.length > 0) return true;
  return false;
};

export const IsEqual = (value1, value2) => value1 === value2;
