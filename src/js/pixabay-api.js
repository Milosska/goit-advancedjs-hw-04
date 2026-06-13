import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '32924526-f9591cfa3face167d801f2034';
const baseParams = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export const getImagesByQuery = query => {
  return axios.get('/', { params: { ...baseParams, q: query } });
};
