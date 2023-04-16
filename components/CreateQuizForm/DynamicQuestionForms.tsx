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
import Add from '@/svgs/Add'

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

                
                    <div className="flex flex-col justify-center items-end mt-6 mb-2">
                        <motion.button 
                            className="flex justify-center items-center outline-none transition w-fit px-4 transition hover:scale-105 rounded-md border-[1px] border-[var(--txt5)]  focus:outline font-[Space Grotesk]"
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
                           <Add 
                                stroke="var(--txt4)" 
                                sub={true}
                                className="hover:scale-105 transition cursor-pointer w-[20px]"/>
                        </motion.button>
                        { err && <SpanError style={{ textAlign: 'center !important'}}>{err}</SpanError>}
                    </div>
                </div>
            )}
        />
    )
}