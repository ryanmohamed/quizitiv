import { motion } from "framer-motion"
import QuestionForm from "../CreateQuizForm/QuestionForm"

const CreateQuizPanel = ({...props}: any) => {
    return (<>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--bg3)] min-h-96 max-w-[600px] px-8 py-14 mt-6 border-[1px] border-[var(--txt5)] rounded-lg self-center"
        >
            <QuestionForm />
        </motion.div>
    </>)
}

export default CreateQuizPanel