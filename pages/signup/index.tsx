import React, { useState } from 'react';
import Router from 'next/router';
import { useAuth } from '../../src/context/AuthContext';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Snackbar from '../../src/modules/components/Snackbar';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../../src/modules/components/Typography';
import AppFooter from '../../src/modules/views/AppFooter';
import AppAppBar from '../../src/modules/views/AppAppBar';
import AppForm from '../../src/modules/views/AppForm';
import { required } from '../../src/modules/form/validation';
import RFTextField from '../../src/modules/form/RFTextField';
import FormButton from '../../src/modules/form/FormButton';
import FormFeedback from '../../src/modules/form/FormFeedback';
import withRoot from '../../src/modules/withRoot';
import APIService from '../../src/api/APIService';
import User from '../../src/model/User';
import {auth} from '../../src/firebase'
function SignUp() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [sent, setSent] = useState(false);
  const { user, signup, updateUserProfile, signout } = useAuth();

  const handleValidate = (values: Record<string, string>) => {
    const errors = required(
      ['firstname', 'lastname', 'email', 'password'],
      values
    );
    if (!values.email) {
      errors.email = 'required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invaild';
    }
    if (!values.password) {
      errors.password = 'required';
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(
        values.password
      )
    ) {
      errors.password =
        'length of password should be 7-15, at least 1 number and 1 special character required';
    }
    if (!values.firstname) {
      errors.firstname = 'required';
    }
    if (!values.lastname) {
      errors.lastname = 'required';
    }
    return errors;
  };

  const handleSubmit = (values: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  }) => {
    const { email, password, firstname, lastname } = values;
    signup(email, password)
    .then(() => {
      const user = auth.currentUser;
      updateUserProfile(user, firstname, lastname);
    })
    .then(() => {
      setSent(true);
      Router.replace('/signin');
    })
    .catch((error: any) => {
      console.log(error);
      setOpen(true);
    });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant='h3' gutterBottom marked='center' align='center'>
            Sign up
          </Typography>
          <Typography variant='body2' align='center'>
            <Link href='/signin' underline='always' id='signIn'>
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={handleValidate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component='form'
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete='firstname'
                    fullWidth
                    label='First Name'
                    name='firstname'
                    data-testid='firstName'
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    fullWidth
                    autoComplete='lastname'
                    label='Last Name'
                    name='lastname'
                    data-testid='lastName'
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete='email'
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label='Email'
                margin='normal'
                name='email'
                data-testid='email'
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name='password'
                autoComplete='new-password'
                label='Password'
                type='password'
                data-testid='password'
                margin='normal'
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color='secondary'
                fullWidth
                onClick={handleSubmit}
                data-testid='submitButton'
              >
                {'Sign Up for free'}
              </FormButton>
            </Box>
          )}
        </Form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity='error'
            sx={{ width: '100%' }}
            data-testid='formErrorMessage'
          >
            Please Try again
          </Alert>
        </Snackbar>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignUp);
