import Typography from '@app/components/Typography';
import React from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { useAtom } from 'jotai';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
// import ImageLoad from 'react-native-image-placeholder';
import Button from '@app/components/Button';
import Input from '@app/components/Input';

import loginAtom from '@app/atoms/signInAtom';

import styles from './styles';

const SignIn: React.FC<{}> = () => {
  const [{ loading, error }, signIn] = useAtom(loginAtom);

  const { navigate } = useNavigation();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Should be a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .length(6, 'Should be 6 digits'),
  });

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        {/* <ImageLoad
          source={{
            uri: 'https://media.istockphoto.com/vectors/people-inside-the-car-wearing-protective-masks-travel-restrictions-on-vector-id1223282002?s=612x612',
          }}
          style={styles.image}
        /> */}
        <Typography.Title style={styles.title} level={3}>
          Sign In
        </Typography.Title>
        <View style={styles.form}>
          <Formik
            validationSchema={loginSchema}
            initialValues={{ email: '', password: '' }}
            validateOnBlur={false}
            validateOnMount={false}
            validateOnChange={false}
            onSubmit={(values) => {
              signIn({
                data: values,
                navigate,
              });
            }}>
            {({ values, errors, handleChange, handleSubmit }) => (
              <>
                <Input.Email
                  placeholder="Email Address"
                  style={styles.input}
                  value={values.email}
                  onChange={handleChange('email')}
                  error={errors.email || undefined}
                />
                <Input.Password
                  placeholder="Password"
                  style={styles.input}
                  value={values.password}
                  onChange={handleChange('password')}
                  error={errors.password || error || undefined}
                />
                <Button
                  type="primary"
                  size="small"
                  style={styles.input}
                  onPress={handleSubmit}
                  loading={loading}>
                  Sign In
                </Button>
              </>
            )}
          </Formik>
        </View>
        <View style={styles.helperText}>
          <Typography.Text>Don't have an account?</Typography.Text>
          <TouchableOpacity
            style={styles.hyperLink}
            onPress={() => {
              navigate('SignUp');
            }}>
            <Typography.Text style={styles.hyperLinkText}>
              Create One
            </Typography.Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
