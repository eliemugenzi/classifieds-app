import { atom } from 'jotai';
import api from '@app/utils/api';
import Toast from 'react-native-toast-message';

const data = {
  data: [] as Record<string, any>[],
  loading: false,
  error: null,
};

const productsData = atom(data);

const getProducts = atom(
  (get) => get(productsData),
  (get, set, payload: any) => {
    const currentData = get(productsData);
    const { search } = payload;

    let url = '/products/my_products';

    if (search) url = `${url}?search=${search}`;

    set(productsData, {
      ...currentData,
      loading: true,
      error: null,
    });

    api
      .get(url)
      .then(({ data: newData }) => {
        console.log({ newData });

        set(productsData, {
          ...currentData,
          loading: false,
          data: newData,
        });
      })
      .catch(({ message }) => {
        set(productsData, {
          ...currentData,
          loading: false,
          error: message,
        });

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: message,
        });
      });
  },
);

export default getProducts;
