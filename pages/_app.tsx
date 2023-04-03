import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'


import theme from '../theme.custom';
import { SupabaseProvider } from '@/providers/SupabaseContext';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SupabaseProvider>
          <Component {...pageProps} />
        </SupabaseProvider>
    </ChakraProvider>
    );
}
