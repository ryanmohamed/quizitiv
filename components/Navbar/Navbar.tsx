import styles from './Navbar.module.css'
import useFirebaseUserContext from '../../hooks/useFirebaseUserContext'
import { useEffect, useState } from 'react'
import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import useMeasure from 'react-use-measure'
import ignoreCircularReferences from '../../lib/ignoreCircularReferences'
import Link from 'next/link'
import Image from 'next/image'

import light from '../../public/svgs/light.svg'
import dark from '../../public/svgs/dark.svg'
import Menu from '@/svgs/Menu'
import Close from '@/svgs/Close'
import Light from '@/svgs/Light'
import Dark from '@/svgs/Dark'

import { useRouter } from 'next/router'
import useThemeContext from '@/hooks/useThemeContext'
import useFirebaseFirestoreContext from '@/hooks/useFirebaseFirestoreContext'
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
    const { dbUser } = useFirebaseFirestoreContext()
    const [ photoURL, setPhotoURL ] = useState<any>(undefined)
    const [ toggle, setToggle ] = useState(false)
    const { SignOut } = useFirebaseAuth()
    const router = useRouter()

    const { darkMode, setDarkMode } = useThemeContext()

    const count = useMotionValue(0)
    const rounded = useTransform(count, Math.round)

    useEffect(() => {
        if ( user?.photoURL === null ) 
            setPhotoURL('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png')
        else
            setPhotoURL(user?.photoURL)
    }, [user])

    useEffect(() => {
        let to = dbUser?.xp ? dbUser.xp : 0;
        const controls = animate(count, to)
        return controls.stop
    }, [user, dbUser, dbUser?.xp])


    console.log(router.pathname)
    return (
        <nav className={styles.navbar}>   
            
            <div className="flex flex-row items-center">
                <Link href="/" className="m-2">
                    <p className='text-2xl'>Quiz-itiv</p>
                </Link>
                <span className='flex items-center justify-center h-min p-1 delay-200'>
                { darkMode ? <Light stroke="var(--txt3)" onClick={() => setDarkMode(!darkMode)} className="cursor-pointer"/> : <Dark fill="var(--txt3)" onClick={() => setDarkMode(!darkMode)} className="cursor-pointer" /> }
                </span>

            </div>

            { dbUser && <div>
                <motion.div className="flex font-[Bangers] text-green-500 text-2xl z-[100]">XP <motion.p className="text-green-500 ml-2">{rounded}</motion.p></motion.div>    
            </div>
            }
        

            { user && <div className={styles.user} >

                <p className={styles.Name}>{ user.isAnonymous ? "Anonymous" : user.displayName == null ? user.email : user.displayName }</p>
                
                { !toggle ? <Menu fill={"var(--txt5)"} style={{cursor: 'pointer'}} onClick={() => setToggle(!toggle)}/> : <Close fill={"var(--txt5)"} style={{cursor: 'pointer'}} onClick={() => setToggle(!toggle)}/> }

                <AnimatePresence>
                { toggle && 
                    <motion.ul 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className={styles.dropdown}
                    >
                        <Link href="/dashboard"><li className="flex items-center justify-evenly">Dashboard<Image src={photoURL} alt={"profile image"} className="rounded-full" height={20} width={20}/></li></Link>
                        <Link href="/community"><li>Community</li></Link>
                        { dbUser?.xp > 290 && <Link href="/gameroom"><li>Game Room</li></Link>}
                        { dbUser?.xp > 100 && <Link href="/settings"><li>Settings</li></Link>}
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

