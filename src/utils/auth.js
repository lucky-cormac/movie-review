export const getAuthHeader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: 'Bearer ' + token };
  }

  return null;
};

export const getTokenInStorage = () => localStorage.getItem('token');
export const getUserInStorage = () => {
  try {
    const userValue = localStorage.getItem('user');
    const user = JSON.parse(userValue);

    if (user) {
      return user;
    }
  } catch (err) {
    console.error(err);
  }

  return null;
};

export const saveTokenInStorage = (token) =>
  localStorage.setItem('token', token);

export const saveUserInStorage = (user) => {
  try {
    const userValue = JSON.stringify(user);
    localStorage.setItem('user', userValue);
  } catch (err) {
    console.error(err);
  }
};

export const deleteTokenInStorage = () => localStorage.removeItem('token');
export const deleteUserInStorage = () => localStorage.removeItem('user');
