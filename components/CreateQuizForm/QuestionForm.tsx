import { Formik, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import DynamicQuestionForms from './DynamicQuestionForms'
import onQuestionFormSubmit from '../../lib/onQuestionFormSubmit'
import { motion } from 'framer-motion'
import styles from './DynamicQuestionForms.module.css'

import useFirebaseUserContext from "../../hooks/useFirebaseUserContext"

import useFirebaseFirestore from '../../hooks/useFirebaseFirestore'

import schema from './ValidationSchema'
import SpanError from '../SpanError/SpanError'

export default function QuestionForm () {
    const { user } = useFirebaseUserContext()
    const { createQuiz } = useFirebaseFirestore()


    const onSubmit = async (values: any, { resetForm }: any) => {
        resetForm()
        await createQuiz(values)
    }

    return (
        <Formik   
            initialValues={{ title: '', subject: '', 
                questions: [{ 
                    question: '',
                    type: 'short',
                    choices: { a: '', b: '', c: '', d: ''},
                    answer: '', 
                    confirmed: false
                }] 
            }}
            validationSchema={schema}
            onSubmit={onSubmit}
            onReset={()=>{}}
        >
            { props => (
                <form onSubmit={(e) => {props.handleSubmit(e)}} className={styles.Form}>
                    <div>
                        <label>Enter the title of your quiz: </label>
                        <input
                            name='title' 
                            type='text' 
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.title}
                            autoComplete='off'
                            placeholder='"React Rollercoaster"' 
                        />
                        { props.errors.title && <SpanError>{props.errors.title}</SpanError> }
                    </div>
                    <div>
                        <label>Enter the subject:</label> 
                        <input
                            name='subject' 
                            type='text' 
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.subject}
                            autoComplete='off'
                            placeholder='"State"' 
                        />
                        { props.errors.subject &&  <SpanError>{props.errors.subject}</SpanError> }
                    </div>
                    <DynamicQuestionForms {...props} />
                    <button type="submit" className="w-[85%] flex justify-center items-center mt-4 outline-none transition px-4 transition hover:scale-105 rounded-md border-[1px] border-green-800 bg-green-500 hover:bg-green-600 focus:outline font-sans text-xl drop-shadow-md">Create quiz</button>
                </form>
            ) } 
        </Formik>
    )
}  