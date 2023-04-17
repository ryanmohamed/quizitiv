import QuizLink from "../QuizLink/QuizLink"
import styles from './QuizLinkContainer.module.css'
import { AnimatePresence } from "framer-motion"


const QuizLinkContainer = ({quizzes}: any) => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className={styles.QuizLinkContainer}>
                <AnimatePresence mode="wait">
                    {quizzes.map((quiz: any, key: any) => (<QuizLink quiz={quiz} key={key}/>))}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default QuizLinkContainer