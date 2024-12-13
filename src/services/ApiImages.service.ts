import axios from 'axios';

const API_KEY = '47613470-fb3b4a59c6e4b21c712fbf244';
const BASE_URL = 'https://pixabay.com/api/';

export const getImages = async (query, perPage = 10) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        per_page: perPage,
        image_type: 'photo',
        safesearch: true,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error('Error al obtener imágenes desde Pixabay:', error);
    throw error;
  }
};

export const getImageById = async (id=1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        id: id,
      },
    });
    if (response.data.hits.length > 0) {
      return response.data.hits[0];
    } else {
      throw new Error('No se encontró ninguna imagen con el ID proporcionado.');
    }
  } catch (error) {
    console.error('Error al obtener la imagen por ID desde Pixabay:', error);
    throw error;
  }
};
