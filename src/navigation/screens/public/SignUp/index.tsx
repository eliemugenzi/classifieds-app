import Typography from '@app/components/Typography';
import React from 'react';
import { useAtom } from 'jotai';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import phone from '@exuus/rwanda-phone-utils';
import Input from '@app/components/Input';
import Button from '@app/components/Button';
import Row from '@app/components/Row';

import signUpAtom from '@app/atoms/signUpAtom';

import styles from './styles';

const SignUp: React.FC<{}> = () => {
  const { navigate } = useNavigation();
  const [{ loading }, register] = useAtom(signUpAtom);

  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email should be valid'),
    phone_number: Yup.string()
      .required('Phone Number is required')
      .test(
        '',
        'Invalid Phone Number',
        (value) => phone(value as string).isValid,
      ),
    password: Yup.string()
      .required('Password is required')
      .length(6, 'Should be 6 digits '),
    confirm_password: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords should match'),
    first_name: Yup.string()
      .required('First Name is required')
      .min(3, 'Should be 3 characters minimum'),
    last_name: Yup.string()
      .required('Last Name is required')
      .min(3, 'Should be 3 characters minimum'),
    role: Yup.string(),
  });

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.wrapper}
        showsVerticalScrollIndicator={false}>
        <Typography.Title level={3} style={styles.title}>
          Create an account
        </Typography.Title>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirm_password: '',
            phone_number: '',
            first_name: '',
            last_name: '',
            role: 'seller',
          }}
          validationSchema={SignUpSchema}
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}
          onSubmit={(values: any) => {
            register({
              data: {
                ...values,
                confirm_password: undefined,
              },
              navigate,
            });
          }}>
          {({ values, errors, handleChange, handleSubmit }) => (
            <>
              <View style={styles.form}>
                <Row style={styles.input}>
                  <Input
                    placeholder="First Name"
                    value={values.first_name}
                    error={errors?.first_name || undefined}
                    onChange={handleChange('first_name')}
                    label="First Name"
                  />
                  <Input
                    placeholder="Last Name"
                    value={values.last_name}
                    error={errors?.last_name || undefined}
                    onChange={handleChange('last_name')}
                    label="Last Name"
                  />
                </Row>

                <Input.Email
                  placeholder="Email Address"
                  style={styles.input}
                  label="Email Address"
                  value={values.email}
                  onChange={handleChange('email')}
                  error={errors?.email}
                />
                <Input.PhoneNumber
                  placeholder="Phone Number"
                  style={styles.input}
                  label="Phone Number"
                  value={values.phone_number}
                  onChange={handleChange('phone_number')}
                  error={errors?.phone_number}
                />
                <Input.Select
                  options={[
                    {
                      label: 'Seller',
                      value: 'seller',
                    },
                    {
                      label: 'Customer',
                      value: 'customer',
                    },
                  ]}
                  style={styles.input}
                  value={values.role}
                  error={errors?.role || undefined}
                  placeholder="Join as"
                  label="Join as"
                />
                <Row style={styles.input}>
                  <Input.Password
                    placeholder="Password"
                    label="Password"
                    value={values?.password}
                    onChange={handleChange('password')}
                    error={errors?.password}
                  />
                  <Input.Password
                    placeholder="Confirm"
                    label="Confirm Password"
                    value={values.confirm_password}
                    onChange={handleChange('confirm_password')}
                    error={errors?.confirm_password}
                  />
                </Row>

                <Button
                  type="primary"
                  size="small"
                  style={styles.input}
                  onPress={handleSubmit}
                  loading={loading}>
                  Create account
                </Button>
              </View>
            </>
          )}
        </Formik>

        <View style={styles.helperWrapper}>
          <Typography.Text>Already have an account?</Typography.Text>
          <TouchableOpacity
            style={styles.hyperLink}
            onPress={() => {
              navigate('SignIn');
            }}>
            <Typography.Text style={styles.helperText}>
              Sign In
            </Typography.Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
