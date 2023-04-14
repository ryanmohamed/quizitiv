import styles from './Navbar.module.css'
import useFirebaseUserContext from '../../hooks/useFirebaseUserContext'
import { useEffect, useState } from 'react'
import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import useMeasure from 'react-use-measure'
import ignoreCircularReferences from '../../lib/ignoreCircularReferences'
import Link from 'next/link'
import Image from 'next/image'

import light from '../../public/svgs/light.svg'
import dark from '../../public/svgs/dark.svg'

import { useRouter } from 'next/router'
import useThemeContext from '@/hooks/useThemeContext'
// import useGetLevel from '../../hooks/useGetLevel'

const d = 0.25

function ResizeablePanel({ children, toggle }: any){
    let [ ref, { height }] = useMeasure()
    return (
        <motion.div
            animate={{ height }}
            className={styles.dropdown}
            key={"dropdown"}
        >
            {/* inner wrapper for content animation */}
            <AnimatePresence mode='wait'>
            <motion.div
                // doesn't rerender for the children, so we need a key that exists outside of the render cycle, that will change and cause an update
                // the most intuitive approach is to use the children themselves as a key
                // we usually get usually due to it being a complex data structure with circular references to itself
                // lets use a work around found in github issues
                key={JSON.stringify(children, ignoreCircularReferences())} // second argument mutates the passed in object
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: d/2, duration: d/2 } }}
                exit={{ opacity: 0, transition: { delay: 0, duration: d/2 } }}
                ref={ref}
            >
                <ul>
                    { children }
                </ul>
            </motion.div>
            </AnimatePresence>
        </motion.div>
    )
}

export default function Navbar ({children} : any) {
    const { user } = useFirebaseUserContext()
    const [ photoURL, setPhotoURL ] = useState<any>(undefined)
    const [ toggle, setToggle ] = useState(false)
    const { SignOut } = useFirebaseAuth()
    const router = useRouter()

    const { darkMode, setDarkMode } = useThemeContext()

    useEffect(() => {
        if ( user?.photoURL === null ) 
            setPhotoURL('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png')
        else
            setPhotoURL(user?.photoURL)
    }, [user])

    

    console.log(router.pathname)
    return (
        <nav className={styles.navbar}>   
            
            <div className="flex flex-row items-center">
                <Link href="/" className="m-2">
                    <p className='text-2xl'>Quiz-itiv</p>
                </Link>
                <span className='flex items-center justify-center h-min bg-gray-100 p-1 m-2 rounded-full delay-200'>
                    <Image src={darkMode ? light : dark} alt="toggle light mode" height={20} width={20} onClick={() => setDarkMode(!darkMode)} className="cursor-pointer" />
                </span>

            </div>
        

            { user && <div className={styles.user} >

                <p className={styles.Name}>{ user.isAnonymous ? "Anonymous" : user.displayName == null ? user.email : user.displayName }</p>
                <Image src={photoURL} alt={"profile image"} height={30} width={30} onClick={() => setToggle(!toggle)}/>
                
                <AnimatePresence>
                { toggle && 
                    <motion.ul 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className={styles.dropdown}
                    >
                        <Link href="dashboard"><li>Dashboard</li></Link>
                        <Link href="community"><li>Community</li></Link>
                        <li onClick={()=>{
                            SignOut()
                            setToggle(false)
                        }}> Logout
                        </li>
                        <li onClick={()=>setToggle(false)}>Close</li>
                    </motion.ul> 
                }
                </AnimatePresence>

            </div> }

        </nav>
    )
} 

