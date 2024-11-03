import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

export const signup = async (name, email, username, password) => {
  try {
    console.log(axios.defaults.baseURL, name, email, username, password);
    const response = await axios.post('/api/v1/auth/register', {
      name,
      email,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : { statusDescription: 'Network error' };
  }
};

export const verifyOtp = async (otp, email) => {
  try {
    const response = await axios.post(`/api/v1/auth/verifyOtp/${otp}/${email}`);
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : { statusDescription: 'Network error' };
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post('/api/v1/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : { statusDescription: 'Network error' };
  }
};
