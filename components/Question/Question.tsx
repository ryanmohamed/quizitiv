import styles from './Question.module.css'
import { Field, ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useFirebaseFirestore from '../../hooks/useFirebaseFirestore'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SpanError from '../SpanError/SpanError'

const Short = (props: any) => {
    const { idx, lock } = props
    return (<>
        <Field as="textarea" name={`answers[${idx}]`} placeholder="Enter your answer" disabled={lock}/>
    </>)
}

const MultipleChoice = ({ lock, choices, idx }: any) => {
    const { a,b,c,d } = choices
    return (<>
        <div className={styles.RadioChoices}>
            <label>
                <Field type="radio" name={`answers[${idx}]`} value='a'  disabled={lock} />
                {a}
            </label>
            <label>
                <Field type="radio" name={`answers[${idx}]`} value='b' disabled={lock}  />
                {b}
            </label>
            <label>
                <Field type="radio" name={`answers[${idx}]`} value= 'c' disabled={lock} />
                {c}
            </label>
            <label>
                <Field type="radio" name={`answers[${idx}]`} value='d'  disabled={lock} />
                {d}
            </label>
        </div>
    </>)
}

const TrueOrFalse = (props: any) => {
    const { idx, lock } = props
    return (<>
        <div className={styles.RadioChoices}>
            <label>
                <Field type="radio" name={`answers[${idx}]`} value="true" disabled={lock} />
                True
            </label>
            <label>
                <Field type="radio" name={`answers[${idx}]`} value="false" disabled={lock} />
                False
            </label>
        </div>
    </>)
}
 
const Question = (props: any) => {
    const { question, type, choices } = props.question
    const { idx, formProps, children } = props
    const [toggle, setToggle]= useState(false)
    return (
        <motion.div 
            className={styles.Question} 
            style={props.style}
            key={idx}
        >
            <h1 className="text-4xl text-[var(--txt4)]">Question {idx+1}</h1>
            <h1 className="text-2xl text-[var(--txt2)] mt-4">{question}</h1>
            <div className="flex flex-col mt-8">
                {type === 'short' ? <Short lock={toggle} idx={idx} /> : type === 'mc' ? <MultipleChoice choices={choices} lock={toggle} idx={idx}/> : <TrueOrFalse lock={toggle} idx={idx} /> }
                { console.log(formProps.errors.answers)}
                {  typeof formProps.errors?.answers === 'object' && <div className="w-full flex"><SpanError>{formProps.errors?.answers[idx]}</SpanError></div>} 
                { children }
                <button onClick={()=>setToggle(!toggle)} className='mt-8 w-fit self-end bg-orange-500 hover:bg-orange-700 border-amber-600 border-2 txt-white px-2 rounded-lg flex items-center justify-center font-bold ' style={{fontFamily: 'Dongle', color: '#EFEFEF'}} type="button">{toggle ? "Unlock" : "Lock"} answer</button>
            </div>
            
            

        </motion.div>
    )
}

export default Question