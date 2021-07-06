import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Typography from '@app/components/Typography';

import styles from './styles';

const ProductList = () => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.wrapper}>
        <Typography.Text>Products</Typography.Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductList;
