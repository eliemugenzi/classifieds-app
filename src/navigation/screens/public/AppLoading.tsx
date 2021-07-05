import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';

import Loader from '@app/components/Loader';

import userLoadAtom from '@app/atoms/userAtom';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AppLoading: React.FC<{}> = () => {
  const { navigate } = useNavigation();

  const [{ loading }, getUser] = useAtom(userLoadAtom);

  React.useEffect(() => {
    getUser({
      navigate,
    });
  }, [getUser, navigate]);

  return <View style={styles.wrapper}>{loading && <Loader />}</View>;
};

export default AppLoading;
