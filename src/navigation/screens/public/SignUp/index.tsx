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
import { isValid } from 'rwanda-phone-utils';
import Input from '@app/components/Input';
import Button from '@app/components/Button';

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
      .test('', 'Invalid Phone Number', (value) => isValid(value)),
    password: Yup.string()
      .required('Password is required')
      .length(6, 'Should be 6 digits '),
    confirm_password: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords should match'),
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
            gender: 'M',
            phone_number: '',
          }}
          validationSchema={SignUpSchema}
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}
          onSubmit={(values: any) => {
            register({
              data: values,
              navigate,
            });
          }}>
          {({ values, errors, handleChange, handleSubmit }) => (
            <>
              <View style={styles.form}>
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
                      label: 'Male',
                      value: 'M',
                    },
                    {
                      label: 'Female',
                      value: 'F',
                    },
                  ]}
                  style={styles.input}
                  label="Gender"
                  placeholder="Gender"
                  value={values.gender}
                  onChange={handleChange('gender')}
                  error={errors?.gender}
                />
                <Input.Password
                  placeholder="Password"
                  style={styles.input}
                  label="Password"
                  value={values?.password}
                  onChange={handleChange('password')}
                  error={errors?.password}
                />
                <Input.Password
                  placeholder="Confirm Password"
                  style={styles.input}
                  label="Confirm Password"
                  value={values.confirm_password}
                  onChange={handleChange('confirm_password')}
                  error={errors?.confirm_password}
                />
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
