import { atom } from 'jotai';
import api from '@app/utils/api';
import Toast from 'react-native-toast-message';

const data = {
  data: {} as Record<string, any>,
  loading: false,
  error: null as string | null,
};

const productData = atom(data);

const addProduct = atom(
  (get) => get(productData),
  (get, set, payload: any) => {
    const { callback, data: data_ } = payload;

    const currentData = get(productData);

    set(productData, {
      ...currentData,
      loading: true,
      error: null,
    });

    api
      .post('/products', data_)
      .then(({ data: newData }) => {
        console.log({ newData });

        set(productData, {
          ...currentData,
          loading: false,
          data: newData,
        });

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'The product has been added successfully',
        });

        callback?.();
      })
      .catch(({ message }) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: message,
        });

        set(productData, {
          ...currentData,
          loading: false,
          error: message,
        });
      });
  },
);

export default addProduct;
