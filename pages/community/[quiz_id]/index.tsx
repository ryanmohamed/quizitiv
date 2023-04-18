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

const QuizPage = () => {
    const router = useRouter()
    const { user } = useFirebaseUserContext()
    const { db, dbUser } = useFirebaseFirestoreContext()
    const { fetchQuizById, submitAnswers, submitRating } = useFirebaseFirestore()

    // state
    const [ quiz, setQuiz ] = useState<any>(null)
    const [ error, setError ] = useState<any>(null)
    const [ start, setStart ] = useState<boolean>(false)
    
    const [ score, setScore ] = useState<any>(null)
    const [ rating, setRating ] = useState<any>(3) // Initial value
    const [ submitted, setSubmitted ] = useState<boolean>(false)

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
            <motion.h1 
                initial={{ y: -200 }} 
                animate={{ y: 0 }}
            >
                {quiz.title}
            </motion.h1>
            <h3 id="subject">{quiz.subject}</h3>


            <div>
                <Image src={quiz.img_url} width={40} height={40} alt={"quiz poster profile pic"}/>
                <h6>
                    Author: <span>{quiz.author}</span>
                </h6>
                <h6>
                    Challenger: <span>{dbUser?.displayName}</span>
                </h6>
            </div>


            { /* TAKEN QUIZ BEFORE */
                dbUser.scores.some((score: any) => score.id === router.query.quiz_id) && <>
                    
                    {/* <Modal>
                        <h6>You&apos;ve taken this quiz before! </h6>
                        <h6 id="history">You scored: {dbUser.scores.find((score: any) => score.id === router.query.quiz_id)?.score}</h6>
                    </Modal> */}

                    <div className={styles.Rating}>
                        <p> { hasRated() ? "Thanks for rating!" : "Help the author out by giving this quiz a rating!" } </p>
                        <Rating
                            style={{ maxWidth: 180, filter: hasRated() ? 'saturate(0.4)' : 'none' }}
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

            <div className="flex items-center justify-end">
                <motion.p 
                    key={ score?.count || 0 }
                    initial={{ scale: 1, rotate: 0 }}
                    animate={{ scale: [0.5, 1.0, 0.5, 1.0],}}
                    className={styles.Score}
                >
                    Score: {score?.count || 0}/{quiz.questions.length}
                </motion.p>
            </div>
        </header>

        { !start ? <>
            {/* QUIZ NOT STARTED YET */}
            <div className="w-full flex items-center justify-center">
                <motion.button 
                    whileTap={{ scale: 0.9 }}
                    animate={{ scale: [1, 1.01, 1.03, 1.05, 1.03, 1.01, 1] }}
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
                        .of( Yup.string().required("Answer required.") )
                        .required("Must answer questions.")
                        .length(quiz.questions.length, "")
                       
                }).required("Required") }
                onSubmit={async ({answers}: any)=>{
                    setScore(null)
                    const s = await submitAnswers(answers, router.query.quiz_id)
                    if(s) {
                        setScore(s)
                        setSubmitted(true)
                    }
                }}
            >
                
                {/*
                    props => <form onSubmit={(e) => {props.handleSubmit(e)}}>
                        
                        <FieldArray 
                            name="answers"
                            render={ arrayHelpers => (<>

                                <QuestionCarousel questions={quiz.questions} score={score} />

                            </>) }
                        />

                        { /* if we have the main level error }
                        { typeof props.errors.answers === 'string' && <span id="feedback">{props.errors.answers}</span>}
                        { !submitted && <button type='submit'>Submit</button>}
                    </form>
                */}

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