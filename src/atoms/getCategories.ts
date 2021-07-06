import api from '@app/utils/api';
import { atom } from 'jotai';
import Toast from 'react-native-toast-message';

const data = {
  data: [] as Record<string, any>[],
  loading: false,
  error: null,
};

const categoriesData = atom(data);

const getCategories = atom(
  (get) => get(categoriesData),
  (get, set) => {
    const currentData = get(categoriesData);

    set(categoriesData, {
      ...currentData,
      loading: true,
      error: null,
    });

    api
      .get('/products/categories')
      .then(({ data: newData }) => {
        set(categoriesData, {
          ...currentData,
          loading: false,
          data: newData,
        });
      })
      .catch(({ message }) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: message,
        });

        set(categoriesData, {
          ...currentData,
          loading: false,
          error: message,
        });
      });
  },
);

export default getCategories;
