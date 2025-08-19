import axios from 'axios';

const BASE_URL = 'https://stealthwriter.toolsworlds.com/api';
// const BASE_URL = 'http://127.0.0.1:8000/api';

export const removeBackgroundAPI = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(`${BASE_URL}/removebg/`, formData, {
    responseType: 'blob',
  });

  return response.data;
};

export const getHelloAPI = async () => {
  const response = await axios.get(`${BASE_URL}/hello`);
  return response.data.message;
};
