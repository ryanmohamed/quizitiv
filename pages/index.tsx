import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import useFirebaseAppContext from '../hooks/useFirebaseAppContext'
import useFirebaseUserContext from '../hooks/useFirebaseUserContext'
import useFirebaseFirestoreContext from '../hooks/useFirebaseFirestoreContext'
import useFirebaseFirestore from '../hooks/useFirebaseFirestore'

import SignUp from '../components/SignUp/SignUp'
import Login from '../components/Login/Login'
import Landing from '@/components/Landing/Landing'
import LandingWave from '@/svgs/LandingWave'
import useThemeContext from '@/hooks/useThemeContext'

import loginImg from '../public/pngs/login.png'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const { user } = useFirebaseUserContext()
  const { app } = useFirebaseAppContext() 
  const { db } = useFirebaseFirestoreContext()
  const [ toggle, setToggle ] = useState<boolean>(false)
  
  const { darkMode } = useThemeContext()
  console.log(darkMode)
  
  return (
    <>
      <Head>
        <title>Quizitiv</title>
        <meta name="description" content="XP-based quiz social media platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.home}>
      
        <Landing />
        <LandingWave style={{ fill: "var(--bg1)", transition: '200ms' }} svgstyle={{ width: '100%', height: 'auto', position: 'absolute', zIndex: '10', filter: 'drop-shadow(0 10px 5px var(--shadow-dark))' }} />
        
        { 
          !user && <div className={styles.login}>
            <section className="bg-sky-600 relative pt-64 flex flex-row-reverse">
              <div className="w-1/2 flex justify-center">{ toggle ? <SignUp toggler={()=>setToggle(false)}/> : <Login toggler={()=>setToggle(true)} /> }</div>
              <div className="w-1/2 flex items-center"><Image src={loginImg} alt="login image" className="w-full h-auto"/></div>
            </section>
          </div>
        }
      </main>
    </>
  )
}
