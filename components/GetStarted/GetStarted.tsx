import { useState } from 'react'
import Image from 'next/image'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import styles from './GetStarted.module.css'
import loginImg from '../../public/pngs/login.png'
import { motion, AnimatePresence } from 'framer-motion'

const GetStarted = () => {
    const [ toggle, setToggle ] = useState<boolean>(false)
    return (
        <div className={styles.login} id="mid">
            <section className="relative pt-64 flex flex-row px-10">
              <div className="w-8/12 flex justify-center">{ toggle ? <SignUp toggler={()=>setToggle(false)}/> : <Login toggler={()=>setToggle(true)} /> }</div>
              <div className="w-4/12 flex items-center flex flex-col items-center justify-center relative">
                <AnimatePresence>
                <motion.div 
                    key="thanks for visiting!"
                    initial={{ x: 1000 }}
                    animate={{ x: 0, rotate: -4  }}
                    whileInView={{ x: 0 }}
                    exit={{ x: -1000 }}
                    className="p-4 rounded-xl text-5xl text-slate-900 shadow-xl shadow-slate-900 m-10 p-10 text-center italic w-fit">Thanks for visiting!</motion.div>
                </AnimatePresence>
                <Image src={loginImg} alt="login image" className="max-w-96 h-auto"/>
            </div>
            </section>
        </div>
    )
}

export default GetStarted