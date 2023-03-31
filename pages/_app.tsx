import '@/styles/globals.css'
import { FirebaseAppProvider } from '../context/FirebaseAppProvider'
import { FirebaseUserProvider } from '../context/FirebaseUserProvider'

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { FirebaseFirestoreProvider } from '../context/FirebaseFirestoreProvider'
import Navbar from '@/components/Navbar/Navbar'
import { ThemeProvider } from '@/context/ThemeProvider'

// import '@smastrom/react-rating/style.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({Component, pageProps}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)
  return <>
    <FirebaseAppProvider>
      <FirebaseUserProvider>
        <FirebaseFirestoreProvider>
          <ThemeProvider>
            <Navbar />
          { Component.getLayout ? getLayout(<Component {...pageProps} />) : <Component {...pageProps} /> }
          </ThemeProvider>
        </FirebaseFirestoreProvider>
      </FirebaseUserProvider>
    </FirebaseAppProvider>
  </>
}

export default App