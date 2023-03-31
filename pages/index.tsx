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

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { user } = useFirebaseUserContext()
  const { app } = useFirebaseAppContext() 
  const { db } = useFirebaseFirestoreContext()
  const [ toggle, setToggle ] = useState<boolean>(false)
  return (
    <>
      <Head>
        <title>Quizitiv</title>
        <meta name="description" content="XP-based quiz social media platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="bg-blue-200">
      
        <Landing />
        
        { 
          !user && <section>
            { toggle ? <SignUp toggler={()=>setToggle(false)}/> : <Login toggler={()=>setToggle(true)} /> }
          </section>
        }
      </main>
    </>
  )
}
