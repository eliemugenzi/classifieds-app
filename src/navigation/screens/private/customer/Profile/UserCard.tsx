import React from 'react';
import { View } from 'react-native';
import phone from '@exuus/rwanda-phone-utils';
import { useAtom } from 'jotai';
import Card from '@app/components/Card';
import Typography from '@app/components/Typography';
import Icon from '@app/components/Icon';

import { userCardStyles } from './styles';

import userAtom from '@app/atoms/userAtom';

interface Props {
  onPress?: () => void;
}

const UserCard: React.FC<Props> = (props) => {
  const [{ data }] = useAtom(userAtom);

  return (
    <Card onPress={props.onPress}>
      <>
        <View style={userCardStyles.titleWrapper}>
          <View style={userCardStyles.profileInfoWrapper}>
            <Icon name="Male" style={userCardStyles.genderIcon} />
            <View style={userCardStyles.ml10}>
              <Typography.Text style={userCardStyles.title}>
                {`${data?.first_name || data?.email} ${
                  data?.last_name || ''
                }`}
              </Typography.Text>
              <Typography.Text style={userCardStyles.userPhone}>
                {phone(data?.phone_number).format('space')}
              </Typography.Text>
            </View>
          </View>

          <Icon name="ArrowRight" />
        </View>
      </>
    </Card>
  );
};

export default UserCard;
