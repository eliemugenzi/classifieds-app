import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty } from 'lodash';
import Toast from 'react-native-toast-message';
import { userAtom } from './userAtom';

import api from '@app/utils/api';

const signInAtom = atom(
  (get) => get(userAtom),
  (get, set, payload: any) => {
    const currentData = get(userAtom);
    const { data, navigate } = payload;
    if (isEmpty(data))
      return set(userAtom, {
        ...currentData,
        error: null,
      });

    set(userAtom, { ...currentData, loading: true, error: null });
    api
      .post('/auth/login', data)
      .then(({ data: newData }) => {
        console.log({ newData });
        AsyncStorage.setItem('user', JSON.stringify(newData));
        AsyncStorage.setItem('token', newData.token);

        set(userAtom, {
          ...currentData,
          loading: false,
          error: null,
          data: { ...currentData.data, ...newData },
        });

        if (newData.role === 'customer') navigate('Customer');
        else if (newData.role === 'seller') navigate('Seller');
      })
      .catch(({ message }) => {
        console.log({ message });
        set(userAtom, {
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

export default signInAtom;
