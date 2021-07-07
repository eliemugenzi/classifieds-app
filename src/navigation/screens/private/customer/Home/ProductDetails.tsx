import React from 'react';
import { SafeAreaView, ScrollView, View, Share } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Image from 'react-native-image-placeholder';
import moment from 'moment';
import numeral from 'numeral';
import { format } from 'rwanda-phone-utils';
import Typography from '@app/components/Typography';
import TitleBar from '@app/components/TitleBar';
import Card from '@app/components/Card';
import Row from '@app/components/Row';
import Icon from '@app/components/Icon';
import Button from '@app/components/Button';

import { detailStyles as styles } from './styles';
import COLORS from '@app/utils/colors';

const ProductDetails: React.FC<{}> = () => {
  const { params } = useRoute<any>();
  const { product } = params;

  const productUrl = product?.image?.replace('http://', 'https://');

  const shareContent = {
    title: product?.name,
    url: productUrl,
    message: `${product?.description}\n\n Price: ${numeral(
      product?.price,
    ).format('0,0')} Rwf`,
  };
  return (
    <SafeAreaView>
      <TitleBar
        title={params?.product?.name}
        subTitle="Product Details"
      />
      <ScrollView style={styles.wrapper}>
        <Card>
          <Typography.Text>{product?.name}</Typography.Text>
          <Image
            source={{
              uri: productUrl,
            }}
            style={styles.image}
          />
          <View>
            <Typography.Paragraph style={styles.description}>
              {product?.description}
            </Typography.Paragraph>
            <Row>
              <View style={styles.rowItem}>
                <Icon name="Calendar" size={18} color={COLORS.blue} />
                <Typography.Text style={styles.rowText}>
                  {moment(product?.created_at).format('ll')}
                </Typography.Text>
              </View>
              <View style={styles.rowItem}>
                <Icon name="Funds" size={18} color={COLORS.blue} />
                <Typography.Text style={styles.rowText}>
                  {numeral(product?.price).format('0,0')} Rwf
                </Typography.Text>
              </View>
            </Row>
            <View style={[styles.rowItem, styles.mv]}>
              <Icon name="Hash" size={18} color={COLORS.blue} />
              <Typography.Text>
                Category: {product?.category?.name}
              </Typography.Text>
            </View>
          </View>
          <View style={styles.mv}>
            <Typography.Title level={4} style={styles.mv}>
              Contact the seller
            </Typography.Title>
            <View>
              <View style={[styles.rowItem, styles.mv]}>
                <Icon name="User" size={18} color={COLORS.primary} />
                <Typography.Text style={styles.rowText}>
                  {`${product?.seller?.first_name} ${product?.seller?.last_name}`}
                </Typography.Text>
              </View>
              <View style={[styles.rowItem, styles.mv]}>
                <Icon name="Chat" size={18} color={COLORS.primary} />
                <Typography.Text style={styles.rowText}>
                  {product?.seller?.email}
                </Typography.Text>
              </View>
              <View style={styles.rowItem}>
                <Icon name="Phone" size={18} color={COLORS.primary} />
                <Typography.Text style={styles.rowText}>
                  {format(product?.seller?.phone_number)}
                </Typography.Text>
              </View>
            </View>
            <View style={styles.mv}>
              <Typography.Title level={4} style={styles.mv}>
                Share with your network
              </Typography.Title>
              <Button
                icon="Send"
                type="primary"
                size="tiny"
                style={styles.mv}
                onPress={() => {
                  Share.share(shareContent);
                }}>
                Share
              </Button>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
