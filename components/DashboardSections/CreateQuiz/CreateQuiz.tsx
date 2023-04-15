import react, { useState } from 'react'
import Add from "@/svgs/Add"
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import CreateQuizPanel from '@/components/CreateQuizPanel/CreateQuizPanel'
import useMeasure from 'react-use-measure'
import ResizeablePanel from '@/components/ResizeablePanel/ResizeablePanel'

const CreateQuiz = ({...props}) => {
    const [toggle, setToggle] = useState(false)
    const [ref, {height}] = useMeasure()

    return (
        <motion.section className="w-full p-12 flex flex-col">
            <h1 className="text-4xl text-[var(--txt4)] mb-4">Create a Quiz</h1>
            <Add 
                onClick={() => setToggle(!toggle)}
                stroke="var(--txt4)" 
                sub={!toggle}
                className="hover:scale-105 transition cursor-pointer"/>

            <MotionConfig transition={{ duration: 0.5 }}>
                <ResizeablePanel d={0.5} className="overflow-hidden self-center">
                    { toggle && <CreateQuizPanel/> }
                </ResizeablePanel>
            </MotionConfig>

        </motion.section>
    )
}

export default CreateQuiz