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
                    <motion.button whileTap={{ scale: 1.1 }} whileHover={{ scale: 1.05 }} type="submit" className={styles.Submit}>Create quiz</motion.button>
                </form>
            ) } 
        </Formik>
    )
}  