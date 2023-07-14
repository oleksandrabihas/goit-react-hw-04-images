import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/';
axios.defaults.params = {
  key: '36760227-fa8dd4880ed4c03c38b0c3c92',
  per_page: 12,
};

export const fetchImages = async (request, page = 1) => {
  const response = await axios.get('api/',{
    params: {
      q: request,
      page,
      }
    }
    );
  return response.data;
};
