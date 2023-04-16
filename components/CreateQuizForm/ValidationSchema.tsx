import * as Yup from 'yup'

const schema = Yup.object().shape({
    title: Yup.string().max(30, "30 character limit").required('Title required.'),
    subject: Yup.string().max(30, "30 character limit").required('Subject required.'),
    questions: Yup.array().of(
        Yup.object().shape({
            question: Yup.string().max(256, "256 character limit").notOneOf(['none', null, undefined, ''], "Question required.").required('Question required.'),
            type: Yup.string().notOneOf(['none', null, undefined, ''], "You must select a type.").required("A type is required."),
            choices: Yup.object({
                a: Yup.string(),
                b: Yup.string(),
                c: Yup.string(),
                d: Yup.string()
            }).when("type", {
                is: "mc",
                then: (schema) => Yup.object({
                    a: Yup.string().max(120, "120 character limit").required("Choice required."),
                    b: Yup.string().max(120, "120 character limit").required("Choice required."),
                    c: Yup.string().max(120, "120 character limit").required("Choice required."),
                    d: Yup.string().max(120, "120 character limit").required("Choice required.")
                }),
                otherwise: (schema) => schema
            }),
            answer: Yup.string().max(256, "256 character limit").notOneOf(['none', '', null, undefined], "Answer required.").required("Answer required"),
            confirmed: Yup.boolean().optional(),
        })
    ).min(1, "Must have atleast one question.")
}) 

export default schema