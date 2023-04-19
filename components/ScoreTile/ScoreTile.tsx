import useFirebaseFirestore from '@/hooks/useFirebaseFirestore'
import useFirebaseFirestoreContext from '@/hooks/useFirebaseFirestoreContext'
import useFirebaseUserContext from '@/hooks/useFirebaseUserContext'
import react, { useEffect, useState } from 'react'
import Link from 'next/link'
import Star from '@/svgs/Star'
import styles from './ScoreTile.module.css'

const ScoreTile = ({score, rating, id, index}: any) => {
    const { user, dbUser } = useFirebaseUserContext()
    const { fetchQuizById } = useFirebaseFirestore()
    const [quiz, setQuiz] = useState<any>(null)

    useEffect(() => {
        if (id) {
            fetchQuizById(id)
              .then((quiz) => {
                    console.log(quiz)
                    setQuiz({
                        title: quiz?.title,
                        subject: quiz?.subject,
                        numQuestions: quiz?.questions.length,
                        rating: quiz?.rating
                    })
                })
        }
    }, [])

    return (
        <div className={styles.Container}> { quiz && <div className="bg-[var(--bg3)] m-4 rounded-md md:h-[240px] md:w-[240px] sm:h-[180px] sm:w-[180px] border-2 border-[var(--txt5)] p-3 relative flex flex-col justify-between" key={index}>
                <div>
                    <Link href={`/community/${id}`}><h1 className="md:text-4xl sm:text-2xl text-[var(--txt3)]">{quiz.title.substring(0, 10)}{(quiz.title.length > 10) ? "..." : ""}</h1></Link>
                    <h1 className="text-lg text-[var(--txt3)]">{quiz.subject}</h1>
                    <p className="flex justify-start items-center my-2 gap-1">{[1,2,3,4,5].map((value) => (<Star fill={ value <= quiz.rating ? "#257BDF" : "var(--txt4)"} key={value}/>))}</p>
                </div>
                <p className="self-end md:h-[40px] md:w-[75px] xs:h-[25px] xs:w-[55px] bg-[#E6E6E6] border-[1px] border-[var(--bg4)] rounded-md flex items-center justify-center md:text-2xl sm:text-lg text-[#64B885]">{Math.floor(score/quiz.numQuestions * 100)}% </p>
            </div>
        } </div>
    )
}

export default ScoreTile