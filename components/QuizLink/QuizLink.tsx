import styles from './QuizLink.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Rating } from '@smastrom/react-rating'

const bgs = ["#b91c1c", "#06b6d4", "#9333ea",
            "#10b981", "#db2777", "#ea580c",
            "#be123c", "#5eead4", "#84cc16"]

const QuizLink = ({quiz, ...props}: any) => {
    return (
        <motion.div
            key={quiz.id}
            initial={{scale: 0, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0, opacity: 0}}
            whileHover={{scale: 0.97, opacity: 1}}
            className="flex flex-col items-center justify-center cursor-pointer hover:shadow-lg" 
            style={{ background: `${bgs[Math.floor(Math.random() * bgs.length)]}`}}>
            <Link href={`/community/${quiz.id}`}>
            <h1 className="text-white text-3xl">{quiz.title}</h1>
            <h1 className="text-slate-200 text-lg">{quiz.subject}</h1>
            <p className="text-slate-300 text-xs">{quiz.num_questions} questions</p>
            <Rating
                style={{ maxWidth: 100 }}
                value={ quiz.rating  }
                readOnly={true}
            />
            </Link>
        </motion.div>
    )
}

export default QuizLink