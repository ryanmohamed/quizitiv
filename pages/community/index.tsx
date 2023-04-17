import { ReactElement, useState, useEffect } from "react"
import UserLayout from "@/layout/UserLayout/UserLayout"
import QuizLinkContainer from "@/components/QuizLinkContainer/QuizLinkContainer"

import useFirebaseFirestore from "@/hooks/useFirebaseFirestore"
import useFirebaseUserContext from "@/hooks/useFirebaseUserContext"
import useFirebaseFirestoreContext from "@/hooks/useFirebaseFirestoreContext"

const Community = () => {
    const { user } = useFirebaseUserContext()
    const { db, dbUser } = useFirebaseFirestoreContext()
    const { quizHeaders, fetchRecentQuizzes, fetchNextRecentQuizzes, queryQuizzesBySubject } = useFirebaseFirestore()
    
    // fetch recent quizzes on first mount
    // but we need to make sure db and user are mounted
    const [ hasMounted, setMounted ] = useState<boolean>(false)

    // recall we're in strict mode so this really will generate twice the amount of reads depending on n, we'll leave it at 5 in development
    // handles await requirement for db and user, navigation and refresh
    useEffect(() => {
        if(db && user && dbUser && !hasMounted){
            const fetch = async () => {
                await fetchRecentQuizzes(4)
                .then(() => setMounted(true))
            }
            fetch()
        }
    }, [db, user, dbUser, hasMounted, fetchRecentQuizzes])

    return (
        <main style={{height: 'calc(100vh - var(--nav-height))'}}>
            <header className="h-72 flex flex-col justify-center items-center text-center p-10">
                <h1 className="text-5xl mb-4">Welcome to the Community!</h1>
                <p className="text-lg mx-2">Test your knowledge on our most popular and recent quizzes.</p>
                <p className="text-lg mx-2">Or search for a quiz of your choice.</p>
            </header>

            <section className="flex flex-col items-center">
                <QuizLinkContainer quizzes={quizHeaders}/>
                <button  
                    className="bg-green-500 hover:bg-green-600 text-lg text-[var(--bg3)] p-2 px-6 rounded-sm shadow-2xl mt-10 hover:scale-105 transition"
                    onClick={()=>{fetchNextRecentQuizzes(2)}}>Load 2 more</button>
            </section>

        </main>
    )
}

Community.getLayout = function getLayout(page: ReactElement) {
    return (
        <UserLayout>
            {page}
        </UserLayout>
    )
}

export default Community