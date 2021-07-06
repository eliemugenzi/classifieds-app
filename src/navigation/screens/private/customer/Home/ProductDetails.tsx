import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Typography from '@app/components/Typography';
import TitleBar from '@app/components/TitleBar';

import { detailStyles as styles } from './styles';

const ProductDetails: React.FC<{}> = () => {
  const { params } = useRoute<any>();
  return (
    <SafeAreaView>
      <TitleBar
        title={params?.product?.name}
        subTitle="Product Details"
      />
      <ScrollView style={styles.wrapper}>
        <Typography.Text>Product Details</Typography.Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
