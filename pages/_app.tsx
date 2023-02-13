import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../src/context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '../src/modules/components/ProtectedRoute';

const noAuthRequired = ['/', '/signin', '/signup', '/signin/forgotpassword'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className='HappyMeal'>
      <AuthContextProvider>
        <React.Fragment>
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </React.Fragment>
      </AuthContextProvider>
    </div>
  );
}
