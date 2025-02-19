// Admin
export const getAdminToken = () => localStorage.getItem("adminToken");

export const setAdminToken = (token) => {
  localStorage.setItem("adminToken", token);
  localStorage.setItem("adminLoginTime", Date.now());
};

export const checkTokenValidity = () => {
  const adminLoginTime = localStorage.getItem("adminLoginTime");
  const tenHours = 10 * 60 * 60 * 1000; // 10 hr millisec me
  return adminLoginTime && Date.now() - adminLoginTime < tenHours;
};

export const clearAdminToken = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminLoginTime");
};

//NOW-USER
export const setUserToken = (token) => {
  localStorage.setItem("userToken", token);
  localStorage.setItem("userLoginTime", Date.now());
};

export const getUserToken = () => {
  return localStorage.getItem("userToken");
};

export const clearUserToken = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userLoginTime");
};

export const isUserSessionValid = () => {
  const userLoginTime = localStorage.getItem("userLoginTime");
  const tenHours = 10 * 60 * 60 * 1000;
  return userLoginTime && Date.now() - userLoginTime < tenHours;
};
