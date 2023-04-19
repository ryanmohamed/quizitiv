import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import useFirebaseAppContext from '../hooks/useFirebaseAppContext'
import useFirebaseUserContext from '../hooks/useFirebaseUserContext'
import useFirebaseFirestoreContext from '../hooks/useFirebaseFirestoreContext'
import useFirebaseFirestore from '../hooks/useFirebaseFirestore'

import Landing from '@/components/Landing/Landing'
import LandingWave from '@/svgs/LandingWave'
import useThemeContext from '@/hooks/useThemeContext'
import GetStarted from '@/components/GetStarted/GetStarted'
import Footer from '@/components/Footer/Footer'
import Story from '@/components/Story/Story'


const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const { user } = useFirebaseUserContext()
  const { app } = useFirebaseAppContext() 
  const { db } = useFirebaseFirestoreContext()
  
  const { darkMode } = useThemeContext()
  console.log(user)
  return (
    <>
      <Head>
        <title>Quizitiv</title>
        <meta name="description" content="XP-based quiz social media platform." />
        <meta name="viewport" content="user-scalable=no, width=device-width, " />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.home}>
      
        <Landing />
        <LandingWave style={{ fill: "var(--bg1)", transition: '200ms' }} svgstyle={{ width: '100%', height: 'auto', position: 'absolute', zIndex: '10', transform: 'translateY(-10px)' }} />
        { !user && <GetStarted /> }
        <Story />


      </main>

      <Footer />
    </>
  )
}
