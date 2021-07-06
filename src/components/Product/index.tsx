import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import numeral from 'numeral';
import moment from 'moment';
import Card from '@app/components/Card';
import ImageLoad from 'react-native-image-placeholder';
import Typography from '@app/components/Typography';
import Row from '@app/components/Row';
import Icon from '../Icon';

import styles from './styles';
import COLORS from '@app/utils/colors';

interface Props {
  name: string;
  description: string;
  price: number;
  status: string;
  category: Record<string, any>;
  seller: Record<string, any>;
  onPress?: () => void;
  image: string;
  style?: StyleProp<ViewStyle>;
  created_at: Date;
}

const Product: React.FC<Props> = (props) => {
  console.log('IMAGE', props.image);
  return (
    <Card onPress={props.onPress} style={props.style}>
      <View>
        <ImageLoad
          source={{ uri: props.image.replace('http', 'https') }}
          onError={(error: any) => console.log('IMAGE FAILED', error)}
          style={styles.image}
        />
      </View>
      <View>
        <Typography.Title level={4} style={styles.name}>
          {props.name}
        </Typography.Title>
        <Typography.Paragraph style={styles.description}>
          {props.description}
        </Typography.Paragraph>
        <Row>
          <View style={styles.subItem}>
            <Icon name="Calendar" size={18} color={COLORS.blue} />
            <Typography.Text style={styles.subItemText}>
              {moment(props.created_at).format('ll')}{' '}
            </Typography.Text>
          </View>
          <View style={styles.subItem}>
            <Icon name="Funds" size={18} color={COLORS.blue} />
            <Typography.Text style={styles.subItemText}>
              {numeral(props.price).format('0,0')} Rwf
            </Typography.Text>
          </View>
        </Row>
      </View>
    </Card>
  );
};

export default Product;
