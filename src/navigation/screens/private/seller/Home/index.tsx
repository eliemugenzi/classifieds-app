import React, { useEffect, useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import * as Yup from 'yup';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import RNFetchBlob from 'rn-fetch-blob';
import {
  SafeAreaView,
  ScrollView,
  Platform,
  FlatList,
  View,
} from 'react-native';
import {
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Typography from '@app/components/Typography';
import Button from '@app/components/Button';
import Loader from '@app/components/Loader';
import Modal from '@app/components/Modal';
import Input from '@app/components/Input';
import FileDisplay from '@app/components/FileDisplay';
import Product from '@app/components/Product';

import getProducts from '@app/atoms/getMyProducts';
import getCategories from '@app/atoms/getCategories';
import addProduct from '@app/atoms/addProduct';

import styles from './styles';

const Seller: React.FC<{}> = () => {
  const { navigate } = useNavigation();
  const [file, setFile] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [{ data: products, loading }, fetchProducts] =
    useAtom(getProducts);
  const [
    { data: categories, loading: gettingCategories },
    fetchCategories,
  ] = useAtom(getCategories);
  const [canAddProduct, setAddProduct] = useState(false);
  const [{ loading: creating }, createProduct] = useAtom(addProduct);

  console.log('MY PR', products, categories);

  const handleImagePicker = async () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
      },
      path: 'images',
      mediaType: 'photo' as MediaType,
    };
    launchImageLibrary(options, async (response) => {
      console.log({ response: response });

      const photo = response.assets[0];

      const filePayload = {
        uri: response.assets[0].uri as string,
        type: 'image/png',
        name: `product-${uuid()}.png`,
      };

      if (!response.didCancel) {
        const filePath =
          Platform.OS === 'ios'
            ? photo?.uri?.replace('file://', '')
            : photo?.uri;

        setUploading(true);

        RNFetchBlob.fetch(
          'POST',
          'https://api.cloudinary.com/v1_1/eliemugenzi/image/upload?upload_preset=d-arrive',
          {
            'Content-Type': 'multipart/form-data',
          },
          [
            {
              name: 'file',
              filename: filePayload.name,
              data: RNFetchBlob.wrap(filePath as string),
            },
          ],
        )
          .then((r) => r.json())
          .then((uploadResponse) => {
            setUploading(false);
            setFile({
              ...file,
              ...photo,
              response_url: uploadResponse.url,
            });
          })
          .catch((uploadErrorr) => {
            setUploading(false);
            console.log({ uploadErrorr });
          });
      }
    });
  };

  const load = useCallback(() => {
    fetchProducts({
      search: null,
    });
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const categoriesData = categories?.map((category) => ({
    label: category?.name,
    value: category?.id,
  }));

  const ProductSchema = Yup.object().shape({
    name: Yup.string().required('Product Name is required'),
    description: Yup.string()
      .required('Product description is required')
      .min(10, 'Should be 10 characters minimum'),
    price: Yup.number()
      .integer('Price should be an integer')
      .required('Price is required'),
    category_id: Yup.number()
      .integer('Should be an integer')
      .required('Category is required'),
  });

  useEffect(() => {
    load();
  }, [load]);
  return (
    <SafeAreaView>
      <ScrollView style={styles.wrapper}>
        <Typography.Title style={styles.title} level={4}>
          My products
        </Typography.Title>
        <Button
          type="primary"
          size="tiny"
          icon="Plus"
          style={styles.mv}
          onPress={() => setAddProduct(true)}>
          New Product
        </Button>
        {(loading || gettingCategories) && <Loader />}
        <FlatList
          data={products}
          renderItem={({ item: product, index }: any) => (
            <View key={index}>
              <Product
                {...product}
                style={styles.mv}
                onPress={() => {
                  navigate('Product', {
                    product,
                  });
                }}
              />
            </View>
          )}
        />
      </ScrollView>
      <Modal
        visible={canAddProduct}
        title="New Product"
        closable
        onClose={() => {
          setAddProduct(false);
          setUploading(false);
        }}
        toggleVisibility={setAddProduct}>
        <Formik
          initialValues={{
            name: '',
            price: 0,
            category_id: 1,
            description: '',
          }}
          validationSchema={ProductSchema}
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}
          onSubmit={(values: any) => {
            console.log({ values });
            const payload = {
              ...values,
              category_id: Number(values.category_id),
              price: Number(values.price),
              image: file?.response_url,
            };

            createProduct({
              data: payload,
              callback: () => {
                setAddProduct(false);
                fetchProducts({
                  search: null,
                });
              },
            });
          }}>
          {({ values, errors, handleChange, handleSubmit }) => (
            <>
              <Button
                icon="Camera"
                style={styles.mv}
                size="tiny"
                disabled={uploading}
                loading={uploading}
                onPress={handleImagePicker}>
                {uploading ? 'Uploading...' : 'Choose an image'}
              </Button>
              {!isEmpty(file) && (
                <FileDisplay
                  fileName={file?.fileName}
                  onClose={() => setFile({})}
                />
              )}
              <Input.Select
                style={styles.mv}
                placeholder="Category"
                options={categoriesData}
                label="Category"
                value={values.category_id}
                onChange={handleChange('category_id')}
                error={errors?.category_id || undefined}
              />
              <Input
                label="Name"
                placeholder="Name"
                style={styles.mv}
                value={values.name}
                onChange={handleChange('name')}
                error={errors?.name || undefined}
              />
              <Input
                label="Description"
                placeholder="Description"
                style={styles.mv}
                value={values.description}
                onChange={handleChange('description')}
                error={errors?.description}
              />
              <Input.Amount
                label="Price"
                placeholder="Price"
                style={styles.mv}
                value={values.price}
                onChange={handleChange('price')}
                error={errors?.price || undefined}
              />
              <Button
                type="primary"
                size="small"
                style={styles.mv}
                disabled={isEmpty(file) || uploading || creating}
                onPress={handleSubmit}
                loading={creating}>
                Add
              </Button>
            </>
          )}
        </Formik>
      </Modal>
    </SafeAreaView>
  );
};

export default Seller;
