import { Formik, Field, ErrorMessage, FieldArray } from 'formik'
import ResizeablePanel from '../ResizeablePanel/ResizeablePanel'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './DynamicQuestionForms.module.css'

import Image from 'next/image'
import add from '../../public/svgs/add.svg'
import { useEffect, useState } from 'react'
import NewQuestion from './NewQuestion/NewQuestion'
import SpanError from '../SpanError/SpanError'
import Carousel from '../Carousel/Carousel'
import useMeasure from 'react-use-measure'

export default function DynamicQuestionForms({values, ...props}: any) {
    const [ err, setErr ] = useState<any>(null)
    const [ numQuestions, setNumQuestions ] = useState(1)
    const [ ref, {height} ] = useMeasure()
    useEffect(() => {
        setErr(null)
    }, [values])
    return (
        <FieldArray
            name="questions"
            render={ arrayHelpers => (
                <div>

                    <motion.div className={styles.QuestionContainer} animate={{ height: height }}>
                        <Carousel arr={values.questions} arrayHelpers={arrayHelpers} {...props} length={numQuestions} myRef={ref}/>
                    </motion.div>

                
                    <div className="flex flex-col justify-center items-center">
                        <motion.button 
                            className="flex justify-center items-center w-full my-2 outline-none"
                            type="button" 
                            onClick={()=>{
                                if(values.questions.every((question: any) => question.confirmed === true)){
                                    setNumQuestions(values.questions.length + 1)
                                    arrayHelpers.push({ question: '', answer: '' })
                                }
                                else
                                    setErr('All questions must be confirmed.')
                        }}>
                           <p className='text-lg mr-2'>Add another question</p>
                           <Image src={add} alt="add question" width={30} height={30}/>
                        </motion.button>
                        { err && <SpanError style={{ textAlign: 'center !important'}}>{err}</SpanError>}
                    </div>
                </div>
            )}
        />
    )
}