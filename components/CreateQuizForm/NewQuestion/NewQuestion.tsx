import { AnimatePresence, motion } from 'framer-motion'
import { Field, ErrorMessage} from 'formik'
import Image from 'next/image'
import styles from './NewQuestion.module.css'

import confirm from '@/public/svgs/confirm.svg'
import edit from '@/public/svgs/edit.svg'
import trash from '@/public/svgs/trash.svg'
import SpanError from '@/components/SpanError/SpanError'

const inputClass = "appearance-none bg-[var(--bg1)] text-[var(--txt2)] border border-[var(--txt5)] rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline"

const TF = ({question, index, ...props}: any) => {
    return (<> 
        <div className='w-full flex flex-col items-end mt-10'> 
            <label>Enter the correct answer</label>
            <Field as="select" name={`questions.${index}.answer`} disabled={question.confirmed} className={inputClass}>
                <option value="none">Select answer</option>
                <option value="true">True</option>
                <option value="false">False</option>
            </Field> 
            
        </div> 
        <div className="w-full flex justify-end">{ props.errors.questions && <SpanError>{props.errors.questions[index]?.answer}</SpanError>}</div>

    </>)
}

const MC = ({question, index,...props}: any) => {
    return (
        <div className="w-full flex flex-col">
            <label className="mt-6">Enter choice a</label>
            <Field name={`questions.${index}.choices.a`} type="text" placeholder="a) Enter choice" disabled={question.confirmed}></Field>
            <ErrorMessage component={SpanError} name={`questions.${index}.choices.a`} />
            

            <label className="mt-6">Enter choice b</label>
            <Field name={`questions.${index}.choices.b`} type="text" placeholder="b) Enter choice" disabled={question.confirmed}></Field>
            <ErrorMessage component={SpanError} name={`questions.${index}.choices.b`} />

            <label className="mt-6">Enter choice c</label>
            <Field name={`questions.${index}.choices.c`} type="text" placeholder="c) Enter choice" disabled={question.confirmed}></Field>
            <ErrorMessage component={SpanError} name={`questions.${index}.choices.c`} />
            
            <label className="mt-6">Enter choice d</label>
            <Field name={`questions.${index}.choices.d`} type="text" placeholder="d) Enter choice" disabled={question.confirmed}></Field>
            <ErrorMessage component={SpanError} name={`questions.${index}.choices.d`} />

            <div className="w-full flex flex-col items-end mt-10">
                <label>Enter the correct answer</label>
                <Field name={`questions.${index}.answer`} as="select" disabled={question.confirmed} className={inputClass}>
                    <option value="none">Select answer</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                </Field>
            </div>
            <ErrorMessage component={SpanError} name={`questions.${index}.answer`} />
        </div>
    )
}

const SA = ({question, index,...props}: any) => {
    return (
        <div className="w-full flex flex-col items-end mt-10">
            <label>Enter the correct answer</label>
            <Field name={`questions.${index}.answer`} type="text" placeholder={`Answer ${index+1}`} disabled={question.confirmed} />
            <div className='w-full flex justify-end'>
                <ErrorMessage component={SpanError} name={`questions.${index}.answer`} />
            </div>
        </div>
    )
}

const NewQuestion = ({question, index, arrayHelpers, ...props}: any) => {
    return (
        <div className={styles.Container}>
            <motion.div key={index} style={{ filter: question.confirmed ? 'saturate(0.2) brightness(0.5)': 'none' }}>                     
                
            

                {/*  TITLE  */}
                <h1 className="self-end text-end border-b-2 border-[var(--txt4)] text-2xl text-[var(--txt5)] mb-[10px]">Question {index+1}</h1>

                { /* TYPE SELECT, LOCK, DELETE */ } 
                <div className='flex flex-row-reverse items-center gap-4 w-full mt-4'>
                    <Field as="select" name={`questions.${index}.type`} disabled={question.confirmed} className={inputClass}>
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
                            <Image src={ question.confirmed ? edit : confirm } alt="confirm or edit" height={30} width={30}/>
                        </button>

                        { index !== 0 && <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1.1 }}
                            onClick={()=>{ 
                                arrayHelpers.remove(index)
                            }}
                        >
                                <Image src={ trash } alt="confirm or edit" height={30} width={30}/> 
                        </motion.button> }
                    </div>
                </div>
                <ErrorMessage component={SpanError} name={`questions.${index}.type`} />

            
                { /* QUESTION  */}
                <div className="mt-10 w-full flex flex-col items-end">
                    <label>Enter the question</label>
                    <Field name={`questions.${index}.question`} type="text" placeholder={`Question ${index+1}`} disabled={question.confirmed} />
                    <ErrorMessage component={SpanError} name={`questions.${index}.question`} />
                </div>


                <AnimatePresence mode="wait">
                <motion.div key={question.type} initial={{opacity:0}} animate={{opacity: 1}} transition={{ delay: 0.2 }} exit={{opacity:0}} className={styles.AnswerFields}>
                { question.type === 't/f' ?  <TF question={question} index={index} {...props} /> : 
                    question.type === 'mc' ? <MC question={question} index={index} {...props} /> : 
                        <SA question={question} index={index} {...props} />
                }
                </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default NewQuestion