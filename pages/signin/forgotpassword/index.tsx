import * as React from 'react';
import { useRouter } from "next/router";
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Typography from '../../../src/modules/components/Typography';
import Link from '@mui/material/Link';
import AppFooter from '../../../src/modules/views/AppFooter';
import AppAppBar from '../../../src/modules/views/AppAppBar';
import AppForm from '../../../src/modules/views/AppForm';
import { email, required } from '../../../src/modules/form/validation';
import RFTextField from '../../../src/modules/form/RFTextField';
import FormButton from '../../../src/modules/form/FormButton';
import FormFeedback from '../../../src/modules/form/FormFeedback';
import withRoot from '../../../src/modules/withRoot';

function ForgotPassword() {
  const router = useRouter()

  const [sent, setSent] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const validate = (values: { [index: string]: string }) => {
    const errors = required(['email'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
      setDisable(true);
    }
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      setDisable(false);
    }

    return errors;
  };

  const handleSubmit = () => {
    setSent(true);
    router.replace('/signin');
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant='h3' gutterBottom marked='center' align='center'>
            Forgot Password
          </Typography>
          <Typography variant='body2' align='center'>
            {'We will send you an email with a link for resetting password'}
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
              data-testid='forgotpassword--form'
              component='form'
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Field
                autoFocus
                autoComplete='email'
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label='Email'
                margin='normal'
                name='email'
                required
                size='large'
                id='email'
                data-testid='email'
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
                disabled={disable || !email}
                size='large'
                color='secondary'
                fullWidth
                id='sendEmail'
                data-testid='sendEmail'
              >
                {'Reset Password'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(ForgotPassword);
