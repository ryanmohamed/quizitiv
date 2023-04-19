import { useEffect, useState, ReactElement} from 'react'
import { useRouter } from 'next/router'
import { QuizData } from 'QuizData'

import { Formik, FieldArray } from 'formik'
import * as Yup from 'yup'

import useFirebaseFirestore from '@/hooks/useFirebaseFirestore'
import useFirebaseUserContext from '@/hooks/useFirebaseUserContext'

import UserLayout from '@/layout/UserLayout/UserLayout'

import { Rating } from '@smastrom/react-rating'

import styles from './QuizPage.module.css'

import { AnimatePresence, motion } from 'framer-motion'
import useFirebaseFirestoreContext from '@/hooks/useFirebaseFirestoreContext'

import Image from 'next/image'

import Question from '@/components/Question/Question'
import SpanError from '@/components/SpanError/SpanError'
import ResizeablePanel from '@/components/ResizeablePanel/ResizeablePanel'

import axios from 'axios'

import useMeasure from 'react-use-measure'

const QuizPage = () => {
    const router = useRouter()
    const { user } = useFirebaseUserContext()
    const { db, dbUser } = useFirebaseFirestoreContext()
    const { fetchQuizById, submitAnswers, submitRating, tempSubmitAnswers } = useFirebaseFirestore()

    // state
    const [ quiz, setQuiz ] = useState<any>(null)
    const [ error, setError ] = useState<any>(null)
    const [ start, setStart ] = useState<boolean>(false)
    
    const [ score, setScore ] = useState<any>(0)
    const [ rating, setRating ] = useState<any>(3) // Initial value
    const [ submitted, setSubmitted ] = useState<boolean>(false)

    const [loading, setLoading] = useState(false)

    // we only want to fetch the quiz once on mount
    // but similarly as before, wait for db and user to be defined
    // so use a flag
    const [ hasMounted, setHasMounted ] = useState<boolean>(false)
    useEffect(() => {
        if (db && user && dbUser && !hasMounted) {
            const fetch = async () => {
                await fetchQuizById(router.query.quiz_id)
                .then((doc: QuizData | undefined) => {
                    setQuiz(doc)
                    setError(null)
                    setHasMounted(true)
                })
                .catch((err: any) => {
                    setQuiz(undefined)
                    setError("An error occured retrieving this quiz.")
                })
            }
            fetch()
        }
    }, [db, user, dbUser, hasMounted, fetchQuizById])

    const hasRated = () => {
        return dbUser.scores.some((score: any) => score.id === router.query.quiz_id && score.rating !== 0) 
    }

    return (<>
    {/* <button onClick={() => fetchQuizById(router.query.quiz_id).then(doc => console.l)}>fetch</button> */}
    { !quiz ? <>An error occured. <p>{error}</p> </> : <main className={styles.QuizPage}>
        
        <header>
            <div className="flex flex-col justify-between">
                <div>
                    <motion.h1 
                        initial={{ y: -200 }} 
                        animate={{ y: 0 }}
                    >
                        {quiz?.title}
                    </motion.h1>
                    <h3>{quiz?.subject}</h3>
                </div>


                <div className="mt-4">
                    <Image src={quiz?.img_url || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"} width={40} height={40} alt={"quiz poster profile pic"}/>
                    <h6>
                        Author: <span>{quiz?.author}</span>
                    </h6>
                    <h6>
                        Challenger: <span>{dbUser?.displayName}</span>
                    </h6>
                </div>
            </div>


            <div className="flex flex-col justify-between">
                { /* TAKEN QUIZ BEFORE */
                    dbUser.scores.some((score: any) => score.id === router.query.quiz_id) && <>
                        
                        {/* <Modal>
                            <h6>You&apos;ve taken this quiz before! </h6>
                            <h6 id="history">You scored: {dbUser.scores.find((score: any) => score.id === router.query.quiz_id)?.score}</h6>
                        </Modal> */}

                        <div className={styles.Rating}>
                            <p> { hasRated() ? "Thanks for rating!" : "Rate this quiz for easy XP!" } </p>
                            <Rating
                                style={{ maxWidth: 180, maxHeight: 40,  filter: hasRated() ? 'saturate(0.4)' : 'none' }}
                                value={ hasRated() ? quiz?.rating : rating }
                                readOnly={ hasRated() ? true : false }
                                onChange={setRating}
                            />
                            { !hasRated() && <button onClick={async () => {
                                await submitRating(rating, router.query.quiz_id)
                                .then((val) => {
                                    setQuiz(val?.data())
                                }) //retrieve new version
                            }}>
                                Submit rating
                            </button>}
                        </div>

                    </>
                }
                <motion.p 
                    className={styles.Score}
                >
                    Score: {score}/{quiz.questions.length}
                </motion.p>
            </div>
        </header>

        { !start ? <>
            {/* QUIZ NOT STARTED YET */}
            <div className="w-full mt-48 flex items-center justify-center">
                <motion.button 
                    whileTap={{ scale: 0.9 }}
                    // animate={{ scale: [1, 1.01, 1.03, 1.05, 1.03, 1.01, 1] }}
                    transition={{ repeat: Infinity, repeatType: "loop" }}
                    onClick={()=>setStart(true)}
                    className="bg-green-500 hover:bg-green-700 transition text-white py-2 px-4 rounded shadow-md shadow-[var(--shadow-dark)]"
                >
                    Click to start
                </motion.button>
            </div>
        </> : <>
            {/* QUIZ STARTED */}
            <Formik 
                initialValues={{ answers: [] }}
                validationSchema={ Yup.object({
                    answers: Yup.array()
                        .of( Yup.string().notOneOf([null, undefined, ""], "Answer required.").max(256, "Maximum response is 256 characters.").required("Answer required.") )
                        .required("Must answer questions.")
                        .length(quiz.questions.length, "Must answer all questions.")
                       
                }).required("Required") }
                onSubmit={async (values: any) => {
                    const answers = values.answers
                    const quiz_id = router.query.quiz_id
                    setLoading(true)
                    await tempSubmitAnswers(answers, quiz_id)
                    .then((values) => {
                        if (values.status === 200) {
                            const { message, score } = values.data
                            score && setScore(score) 
                        }
                        setLoading(false)
                    })
                    .catch((err: any) => { setError(err.message) })
                }}
            >
                
                
                {
                    props => <form onSubmit={(e) => {props.handleSubmit(e)}}>
                        
                    
                    <FieldArray 
                        name="answers"
                        render={ arrayHelpers => (<>
                            {quiz.questions.map((question: any, index: any) => (<Question question={question} key={index} idx={index} arrayHelpers={arrayHelpers} formProps={props} style={{ borderBottom: index === quiz.questions.length-1 ? 'none' : '1px solid var(--txt4)'}} />))}
                            {/* <QuestionCarousel questions={quiz.questions} score={score} /> */}
                        </>) }
                    />

                    { !submitted && <div className="my-20 flex items-center justify-center"><button className="px-10 border-2 border-green-600 font-[Bangers] flex items-center justify-center rounded-2xl" type='submit'>Submit Quiz</button></div>}
                    { /* if we have the main level error */ }
                    { typeof props.errors.answers === 'string' && <div className="w-full flex"><SpanError className="text-[red] text-[18px] mt-[10px]">{props.errors.answers}</SpanError></div>}


                    </form>

                        

                }
               

            </Formik>

        </> }
        
        

    </main>}
    </>)
}

QuizPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <UserLayout>
            {page}
        </UserLayout>
    )
}

export default QuizPage