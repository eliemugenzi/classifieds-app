import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@app/utils/api';

const data = {
  data: {
    token: null,
  } as Record<string, any>,
  loading: false,
  error: null as string | null,
};

export const INITIAL_USER_DATA = data;
export const userAtom = atom(data);

const userLoadAtom = atom(
  (get) => get(userAtom),
  (get, set, payload: any) => {
    const { navigate, addData } = payload;
    const currentData = get(userAtom);

    if (addData) {
      AsyncStorage.setItem(
        'user',
        JSON.stringify({ ...currentData.data, ...addData }),
      );
      set(userAtom, {
        ...currentData,
        loading: false,
        data: { ...currentData, ...addData },
      });
    } else {
      set(userAtom, {
        ...currentData,
        loading: true,
        error: null,
      });

      api
        .get('/users/current_user')
        .then(({ data: newData }) => {
          console.log({ newData });
          AsyncStorage.setItem('user', JSON.stringify(newData));
          set(userAtom, {
            ...currentData,
            loading: false,
            data: { ...currentData.data, ...newData },
          });

          if (newData.role === 'customer') navigate?.('Customer');
          else if (newData.role === 'seller') navigate?.('Seller');
        })
        .catch(({ message }) => {
          console.log({ message });
          set(userAtom, {
            ...currentData,
            loading: false,
            error: message,
          });

          navigate?.('SignIn');
        });
    }
  },
);

export default userLoadAtom;
