import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../src/context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='app_wrapper'>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </div>
  );
}
