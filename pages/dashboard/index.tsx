import useFirebaseUserContext from "@/hooks/useFirebaseUserContext";
import UserLayout from "@/layout/UserLayout/UserLayout";

import { ReactElement, useEffect } from "react";
import type { NextPageWithLayout } from '../_app'

import useFirebaseFirestoreContext from "@/hooks/useFirebaseFirestoreContext";
import XPBar from "@/components/XPBar/XPBar";
import ScoreTile from "@/components/ScoreTile/ScoreTile";
import CreateQuiz from "@/components/DashboardSections/CreateQuiz/CreateQuiz";

const Dashboard: NextPageWithLayout = () => {
    const { user } = useFirebaseUserContext()
    const { dbUser } = useFirebaseFirestoreContext()

    {console.log(dbUser?.scores)}
    return (<main>
        <header className="m-12">
            <div className="flex flex-col items-end w-full">
                <h1 className="text-6xl mb-20 text-right">Welcome {!user.isAnonymous && 'back'} {user?.displayName?.split(' ')[0] || user?.email || 'Anonymous' }!</h1>
                { dbUser?.xp !== null && dbUser?.xp !== undefined  && <XPBar xp={dbUser?.xp} /> }
            </div>
        </header>
        
        {/* latest scores  */}
       <section className="p-12 flex flex-col justify-center items-center">
            <h1 className="text-4xl text-[var(--txt4)] self-start f">Your latest scores</h1>
            <div className="max-w-min border-[var(--bg4)] border-2 rounded-lg m-10">
                { dbUser?.scores?.length > 0 ? <>
                    <div className="w-max flex sm:flex-row xs:flex-col justify-start gap-10 p-4 flex-wrap"> 
                        { dbUser?.scores && [...dbUser?.scores, ...dbUser?.scores, ...dbUser?.scores].map((score: any, index: any) => (
                        <ScoreTile {...score} index={index} key={index}/>
                    ))}
                    </div>
                    <div className="flex justify-center items-center mb-4">
                        <button className="bg-[#257BDF] hover:bg-[#207BEF] hover:scale-105 transition text-[var(--bg1)] border-none md:text-lg sm:text-sm rounded-md md:h-[40px] md:w-[140px] xs:h-[30px] xs:w-[90px]">See more</button>
                    </div>
                </> : <>
                    <div className="w-[80vw] p-10">
                        <p className="text-lg">Uh-oh, you haven&apos;t tried any quizzes yet!</p>
                        <p>No worries! Try one in our community section.</p>
                    </div>
                </>}
            </div>
       </section>

        {/* create a quiz */}
        <CreateQuiz />

        <section className="w-full h-auto bg-green-900">
            <h1 className="text-3xl">Modify a Quiz</h1>
        </section>

    </main>)
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return (
        <UserLayout>
            {page}
        </UserLayout>
    )
}

export default Dashboard