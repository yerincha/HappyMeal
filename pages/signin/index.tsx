import React, { useState } from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from "next/router";
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Snackbar from '../../src/modules/components/Snackbar';

import Typography from '../../src/modules/components/Typography';
import AppFooter from '../../src/modules/views/AppFooter';
import AppAppBar from '../../src/modules/views/AppAppBar';
import AppForm from '../../src/modules/views/AppForm';
import { required } from '../../src/modules/form/validation';
import RFTextField from '../../src/modules/form/RFTextField';
import FormButton from '../../src/modules/form/FormButton';
import FormFeedback from '../../src/modules/form/FormFeedback';
import withRoot from '../../src/modules/withRoot';

function SignIn() {
  const router = useRouter()
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(false);
  const { signin } = useAuth();

  const validate = (values: { email: string; password: string }) => {
    const errors = required(['email', 'password'], values);

    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };

  type userObj = {[key: string]: {uid: string}}
  const handleSubmit = (values: { email: string; password: string; }) => {
    signin(values.email, values.password)
      .then(() => {
        router.push('/')
      })
      .catch((error: { code: string; message: string; }) => {
        if(error.code !== 'auth/missing-email') {
          setOpen(true);
        }
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
            Sign in
          </Typography>
          <Typography variant='body2' align='center'>
            <Link href='/signup' align='center' underline='always' id='redirectSignUpButton'>
            No account yet? Sign up
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component='form'
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
              data-testid='signin--form'
            >
              <Field
                autoComplete='email'
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label='Email'
                margin='normal'
                name='email'
                data-testid='email'
                required
                size='large'
              />
              <Field
                fullWidth
                size='large'
                component={RFTextField}
                disabled={submitting || sent}
                required
                name='password'
                autoComplete='current-password'
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
                size='large'
                color='secondary'
                fullWidth
                onClick={handleSubmit}
                data-testid='signIn'
              >
                {submitting || sent ? 'Please wait' : 'Sign in'}
              </FormButton>
            </Box>
          )}
        </Form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }} id='formErrorMessage'>
            Please try again
          </Alert>
        </Snackbar>
        <Typography align='center'>
          <Link underline='always' href='/signin/forgotpassword' id='redirectForgotPassword'>
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);
