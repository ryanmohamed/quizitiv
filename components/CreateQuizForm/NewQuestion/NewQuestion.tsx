import { AnimatePresence, motion } from 'framer-motion'
import { Field, ErrorMessage} from 'formik'
import Image from 'next/image'
import styles from './NewQuestion.module.css'

import confirm from '@/public/svgs/confirm.svg'
import edit from '@/public/svgs/edit.svg'
import trash from '@/public/svgs/trash.svg'
import SpanError from '@/components/SpanError/SpanError'

const TF = ({question, index, ...props}: any) => {
    return (<> 
        <div> 
            <p>The answer is </p>
            <Field as="select" name={`questions.${index}.answer`} disabled={question.confirmed}>
                <option value="none">Select answer</option>
                <option value="true">True</option>
                <option value="false">False</option>
            </Field> 
            
        </div> { props.errors.questions && <motion.span animate={{ x: [-20, 20, -8, 8, -7, 7, 0]}} transition={{ duration: 0.5 }} id="feedback">{props.errors.questions[index]?.answer}</motion.span> } 
    </>)
}

const MC = ({question, index,...props}: any) => {
    return (
        <div>
            <Field name={`questions.${index}.choices.a`} type="text" placeholder="a) Enter choice" disabled={question.confirmed}></Field>
            <ErrorMessage component={'span'} name={`questions.${index}.choices.a`} />
            
            <Field name={`questions.${index}.choices.b`} type="text" placeholder="b) Enter choice" disabled={question.confirmed}></Field>
            <ErrorMessage component={'span'} name={`questions.${index}.choices.b`} />

            <Field name={`questions.${index}.choices.c`} type="text" placeholder="c) Enter choice" disabled={question.confirmed}></Field>
            <ErrorMessage component={'span'} name={`questions.${index}.choices.c`} />
            
            <Field name={`questions.${index}.choices.d`} type="text" placeholder="d) Enter choice" disabled={question.confirmed}></Field>
            <ErrorMessage component={'span'} name={`questions.${index}.choices.d`} />

            <div>
                <p>The correct answer is </p>
                <Field name={`questions.${index}.answer`} as="select" disabled={question.confirmed}>
                    <option value="none">Select answer</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                </Field>
            </div>
            <ErrorMessage component={'span'} name={`questions.${index}.answer`} />
        </div>
    )
}

const SA = ({question, index,...props}: any) => {
    return (
        <>
            <Field name={`questions.${index}.answer`} type="text" placeholder={`Answer ${index+1}`} disabled={question.confirmed} />
            <ErrorMessage component={'span'} name={`questions.${index}.answer`} />
        </>
    )
}

const NewQuestion = ({question, index, arrayHelpers, ...props}: any) => {
    return (
        <div className={styles.Container}>
            <motion.div key={index} style={{ filter: question.confirmed ? 'saturate(0.2)': 'none' }}>                     
                
                {/*  TITLE  */}
                <div className="flex flex-col">
                    <h1 className="self-center text-center text-2xl text-[var(--txt5)] mb-[10px]">Question {index+1}</h1>
                    <Field name={`questions.${index}.question`} type="text" placeholder={`Question ${index+1}`} disabled={question.confirmed} />
                    { props.errors.questions && <SpanError>{props.errors.questions[index]?.question}</SpanError> }
                </div>

                <AnimatePresence mode="wait">
                <motion.div key={question.type} initial={{opacity:0}} animate={{opacity: 1}} exit={{opacity:0}}>
                { question.type === 't/f' ?  <TF question={question} index={index} {...props} /> : 
                    question.type === 'mc' ? <MC question={question} index={index} {...props} /> : 
                        <SA question={question} index={index} {...props} />
                }
                </motion.div>
                </AnimatePresence>

                <div>
                    <Field as="select" name={`questions.${index}.type`} disabled={question.confirmed}>
                        <option value="none">Select type</option>
                        <option value="short">Short Answer</option>
                        <option value="mc">Multiple Choice</option>
                        <option value="t/f">True/False</option>
                    </Field>
                    

                    <div>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                let cpy = question
                                cpy.confirmed = !question.confirmed
                                arrayHelpers.replace(index, cpy) // use array helpers to cause update to form values and therefore rerender     
                            } }
                        >
                            <Image src={ question.confirmed ? edit : confirm } alt="confirm or edit" height={25} width={25}/>
                        </button>

                        { index !== 0 && <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1.1 }}
                            onClick={()=>{ 
                                arrayHelpers.remove(index)
                            }}
                        >
                                <Image src={ trash } alt="confirm or edit" height={25} width={25}/> 
                        </motion.button> }
                    </div>
                </div>
                <ErrorMessage component={'span'} name={`questions.${index}.type`} />

            </motion.div>
        </div>
    )
}

export default NewQuestion