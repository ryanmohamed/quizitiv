import { motion } from 'framer-motion'
import ignoreCircularReferences from '@/lib/ignoreCircularReferences'

const SpanError = ({children, ...props}: any) => {

    return (<>
    
    <motion.span 
            key={JSON.stringify(children, ignoreCircularReferences())}
            animate={{ x: [-20, 20, -8, 8, -7, 7, 0]}} 
            transition={{ duration: 0.5 }}
            style={{color:'red'}}
            {...props}
        >
            {children}
        </motion.span>
    
    </>)
}

export default SpanError