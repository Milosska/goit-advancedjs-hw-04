import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '32924526-f9591cfa3face167d801f2034';
export const PER_PAGE = 15;
const baseParams = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: PER_PAGE,
};

export const getImagesByQuery = async (query, page) => {
  const images = await axios.get('/', {
    params: { ...baseParams, q: query, page },
  });
  return images.data;
};
