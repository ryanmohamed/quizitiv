import styles from './NotLoggedIn.module.css'
import Image from 'next/image'
import img from '../../public/svgs/lock.svg'
export default function NotLoggedIn () {
    return (<main className="w-full text-3xl flex flex-col justify-center items-center" style={{ height: 'calc(100vh - var(--nav-height))' }}>
        <Image src={img} alt="lock icon" width={100} height={100}/>
        <h1> You&apos;re not signed in </h1>
        <p className="text-xl"> Unfortunately you cannot access this page </p>
    </main>)
}