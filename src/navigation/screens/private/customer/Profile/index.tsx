import React from 'react';
import { ScrollView } from 'react-native';

import UserCard from './UserCard';
import Settings from './Settings';

import styles from './styles';

const Profile: React.FC<{}> = () => {
  return (
    <ScrollView
      style={styles.wrapper}
      showsVerticalScrollIndicator={false}>
      <UserCard />
      <Settings />
    </ScrollView>
  );
};

export default Profile;
