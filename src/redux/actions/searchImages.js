import axios from 'axios';

export const searchImages = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=33256265-9311bbeda59bd85787262c6fb&q=yellow+flowers&image_type=vector&pretty=true`);

      dispatch({
        type: 'SEARCH_IMAGES',
        payload: response.data.hits,
      });
    } catch (error) {
      console.error('Ошибка при поиске изображений', error);
    }
  };
};