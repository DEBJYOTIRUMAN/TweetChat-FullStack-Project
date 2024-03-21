// Token Storage
export const getToken = () => {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem("token");
    resolve(token);
  });
};

export const storeToken = (token) => {
  window.localStorage.setItem("token", JSON.stringify(token));
};
