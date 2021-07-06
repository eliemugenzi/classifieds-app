import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useAtom } from 'jotai';

import UserCard from './UserCard';
import Settings from './Settings';

import userAtom from '@app/atoms/userAtom';

import styles from './styles';

const Profile: React.FC<{}> = () => {
  const [{ data }] = useAtom(userAtom);
  console.log({ currentUser: data });

  return (
    <ScrollView
      style={styles.wrapper}
      showsVerticalScrollIndicator={false}>
      <UserCard />
      <Settings />
      <Text>It's me</Text>
    </ScrollView>
  );
};

export default Profile;
