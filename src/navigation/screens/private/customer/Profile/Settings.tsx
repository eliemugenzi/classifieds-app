import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useAtom } from 'jotai';
import { useNavigation } from '@react-navigation/native';
import Card from '@app/components/Card';
import Typography from '@app/components/Typography';

import Loader from '@app/components/Loader';

import { settingsStyles as styles } from './styles';

import signOutAtom from '@app/atoms/signOut';

const Settings: React.FC<{}> = () => {
  const [{ loading }, logOut] = useAtom(signOutAtom);
  const { navigate } = useNavigation();

  return (
    <>
      <Card style={styles.wrapper}>
        <Typography.Title level={4} style={styles.title}>
          Settings
        </Typography.Title>
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.actionTouchable}
            onPress={() => {
              logOut({
                navigate,
              });
            }}>
            {loading ? (
              <Loader />
            ) : (
              <Typography.Text>Sign Out</Typography.Text>
            )}
          </TouchableOpacity>
        </View>
      </Card>
    </>
  );
};

export default Settings;
