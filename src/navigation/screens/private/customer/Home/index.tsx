import React, { useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';

import {
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Typography from '@app/components/Typography';
import Product from '@app/components/Product';
import Loader from '@app/components/Loader';

import getProducts from '@app/atoms/getProducts';

import styles from './styles';

const Seller: React.FC<{}> = () => {
  const { navigate } = useNavigation();
  const [{ data: products, loading }, fetchProducts] =
    useAtom(getProducts);

  const load = useCallback(() => {
    fetchProducts({
      search: null,
    });
  }, [fetchProducts]);

  useEffect(() => {
    load();
  }, [load]);
  return (
    <SafeAreaView>
      <ScrollView style={styles.wrapper}>
        <Typography.Title style={[styles.title, styles.mv]} level={4}>
          Available Products
        </Typography.Title>
        {loading && <Loader />}

        <FlatList
          data={products}
          renderItem={({ item: product, index }: any) => (
            <View key={index}>
              <Product
                {...product}
                style={styles.mv}
                onPress={() => {
                  navigate('ProductDetails', {
                    product,
                  });
                }}
              />
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Seller;
