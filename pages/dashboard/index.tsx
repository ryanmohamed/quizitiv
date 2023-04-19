import useFirebaseUserContext from "@/hooks/useFirebaseUserContext";
import UserLayout from "@/layout/UserLayout/UserLayout";

import { ReactElement, useEffect, useState } from "react";
import type { NextPageWithLayout } from '../_app'

import useFirebaseFirestoreContext from "@/hooks/useFirebaseFirestoreContext";
import XPBar from "@/components/XPBar/XPBar";
import ScoreTile from "@/components/ScoreTile/ScoreTile";
import CreateQuiz from "@/components/DashboardSections/CreateQuiz/CreateQuiz";
import ResizeablePanel from "@/components/ResizeablePanel/ResizeablePanel";

const Dashboard: NextPageWithLayout = () => {
    const { user } = useFirebaseUserContext()
    const { dbUser } = useFirebaseFirestoreContext()
    //check this out tmr
    const [ num, setNum ] = useState(Math.min(3, dbUser?.scores.length))

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
            <h1 className="text-4xl text-[var(--txt3)] self-start">Your latest scores</h1>
            <div className="max-w-min border-[var(--bg4)] border-2 bg-[var(--bg1)] rounded-lg m-10 pb-4">
                { dbUser?.scores?.length > 0 ? <ResizeablePanel d={0.5}>
                    <div className="w-[80vw] flex sm:flex-row xs:flex-col flex-wrap justify-center items-center p-4"> 
                        { dbUser?.scores && dbUser?.scores.slice(0, num).map((score: any, index: any) => (
                        <ScoreTile {...score} index={index} key={index}/>
                    ))}
                    </div>
                    <div className="flex justify-center items-center">
                        { dbUser?.scores.length > num ? <button 
                            onClick={()=>{
                                if(num + 3 <= dbUser?.scores.length+3)
                                    setNum(num + 3)
                            }} 
                            className="bg-[#257BDF] hover:bg-[#207BEF] hover:scale-105 transition text-[var(--bg1)] border-none md:text-lg sm:text-sm rounded-md md:h-[40px] md:w-[140px] xs:h-[30px] xs:w-[90px]">
                            See more
                        </button> : <button 
                            onClick={()=>{
                                setNum(Math.min(3, dbUser?.scores.length))
                            }} 
                            className="bg-[#257BDF] hover:bg-[#207BEF] hover:scale-105 transition text-[var(--bg1)] border-none md:text-lg sm:text-sm rounded-md md:h-[40px] md:w-[140px] xs:h-[30px] xs:w-[90px]">
                            See less
                        </button>
                        }
                    </div>
                </ResizeablePanel> : <>
                    <div className="w-[80vw] p-10">
                        <p className="text-lg">Uh-oh, you haven&apos;t tried any quizzes yet!</p>
                        <p>No worries! Try one in our community section.</p>
                    </div>
                </>}
            </div>
       </section>

        {/* create a quiz */}
        <CreateQuiz />

        <section className="w-full h-auto p-12">
            <h1 className="text-4xl text-[var(--txt3)] self-start">Modify a Quiz</h1>
            <p>In progress...</p>
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