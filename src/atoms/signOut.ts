import { atom } from 'jotai';
import api from '@app/utils/api';
import { userAtom } from './userAtom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const data = {
  data: {} as Record<string, any>,
  loading: false,
  error: null as string | null,
};

const logOutData = atom(data);

const signOutAtom = atom(
  (get) => get(logOutData),
  (get, set, payload: any) => {
    const { navigate } = payload;
    const currentData = get(logOutData);

    set(logOutData, { ...currentData, loading: true, error: null });

    api
      .get('/auth/logout')
      .then(({ data: newData }) => {
        console.log({ newData });
        set(logOutData, {
          ...currentData,
          loading: false,
          error: null,
          data: newData,
        });
        set(userAtom, {
          data: {},
          loading: false,
          error: null,
        });
        AsyncStorage.clear();
        navigate('SignIn');
      })
      .catch(({ message }) => {
        set(logOutData, {
          ...currentData,
          loading: false,
          error: message,
        });

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: message || 'Unknown Error',
        });
      });
  },
);

export default signOutAtom;
