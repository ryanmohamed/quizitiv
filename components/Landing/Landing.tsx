import useFirebaseUserContext from '@/hooks/useFirebaseUserContext'
import Image from 'next/image'
import Link from 'next/link'
import item from '../../public/pngs/3d.png'
import styles from './Landing.module.css'

const Landing = () => {
    const { user } = useFirebaseUserContext()
    return (
        <div className={styles.container}>
            <section className="w-full h-96 bg-purple-200 flex flex-row items-center justify-evenly py-10 pr-10">
            
                <div className="flex flex-col items-center w-4/6 z-50">
                    <h1 className="text-5xl text-center z-50">Welcome to Quizitiv</h1>
                    <p className='text-md text-center mt-5 mb-5 z-50 leading-7 pl-20 pr-20'>Take quizzes or create your own. <br /> Learn and gain xp, get access to easter eggs and special features. <br /> Post and join the community.</p>
                </div>

                <div className="flex flex-col items-center justify-between relative z-50 w-1/3">
                    <Image src={item} alt="hero" className="max-w-xs absolute inset-1/2 z-10" style={{ transform: "translate3d(-50%, -50%, 0)" }}/>
                    { user === null && <a href="#mid" className="z-50 bg-sky-500 text-slate-100 p-2 m-2 border-solid border-2 rounded-sm text-center">Sign up or log in</a> }
                    <Link href="/dashboard" className="z-50 bg-sky-500 text-slate-100 p-2 m-2 border-solid border-2 rounded-sm text-center">Check out your dashboard</Link>
                </div>
            </section>
        </div>
    )
}

export default Landing