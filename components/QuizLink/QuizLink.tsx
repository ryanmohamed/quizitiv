import styles from './QuizLink.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Rating } from '@smastrom/react-rating'

const bgs = ["#b91c1c", "#06b6d4", "#9333ea",
            "#10b981", "#db2777", "#ea580c",
            "#be123c", "#84cc16"]

const QuizLink = ({quiz, ...props}: any) => {
    return (
        <motion.div
            key={quiz.id}
            initial={{scale: 0, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0, opacity: 0}}
            whileHover={{scale: 0.97, opacity: 1}}
            className={styles.QuizLink} 
            style={{ background: `${bgs[Math.floor(Math.random() * bgs.length)]}`}}>
            <Link href={`/community/${quiz.id}`}>
            <h1 className={`text-white  ${ quiz.title.length > 9 ? "text-md" : "text-3xl"}`}>{quiz.title}</h1>
            <h1 className={`text-slate-200 ${ quiz.title.length > 9 ? "text-sm" : "text-lg"}`}>{quiz.subject}</h1>
            <p className="text-slate-300 text-xs">{quiz.num_questions} questions</p>
            <div className={styles.Rating}>
                <p>
                    Rating 
                    <div>{Math.round(quiz.rating * 100) / 100}</div>
                </p>
            </div>
            </Link>
        </motion.div>
    )
}

export default QuizLink