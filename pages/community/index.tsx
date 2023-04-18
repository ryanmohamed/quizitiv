import { ReactElement, useState, useEffect } from "react"
import UserLayout from "@/layout/UserLayout/UserLayout"
import QuizLinkContainer from "@/components/QuizLinkContainer/QuizLinkContainer"

import useFirebaseFirestore from "@/hooks/useFirebaseFirestore"
import useFirebaseUserContext from "@/hooks/useFirebaseUserContext"
import useFirebaseFirestoreContext from "@/hooks/useFirebaseFirestoreContext"

import { Formik, Form, Field } from "formik"

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

            <div className="mb-10 flex justify-center items-center">
                <Formik
                    initialValues={{ subject: '' }}
                    onSubmit={ async ({subject}: any) => {
                        if (subject.trim() === ''){
                            fetchRecentQuizzes(4)
                        }
                        else {
                            queryQuizzesBySubject(subject)
                        }
                    }}
                    onReset={()=>console.log("reset")}
                >
                <Form>
                    <Field type="text" name="subject" placeholder="Search for a subject" className="h-12 w-[50vw] max-w-[500px] mr-6 rounded-3xl p-4 outline-none active:outline-none active:scale-105 hover:scale-105 transition cursor-pointer" style={{ boxShadow: '0 2px 10px var(--shadow-dark)'}} />
                    <button type="submit" className="bg-red-500 hover:bg-red-700 hover:scale-105 transition text-white font-bold py-2 px-4 rounded-lg shadow-[var(--shadow-dark)]">Search</button>
                </Form>
                </Formik>
            </div>

            <section className="flex flex-col items-center p-10">
                { quizHeaders.length > 0 ? <>
                    <QuizLinkContainer quizzes={quizHeaders}/>
                    
                    </> : <div className="text-3xl text-[var(--txt3)] font-bold flex items-center justify-center h-48">No quizzes found.</div> 
                }
                { quizHeaders.length > 2 && <button  
                    className="bg-emerald-500 hover:bg-emerald-700 my-10 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={()=>{fetchNextRecentQuizzes(2)}}>Load 2 more</button>}
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