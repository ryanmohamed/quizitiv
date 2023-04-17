import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from 'popmotion'
import useMeasure from 'react-use-measure'
import Image from 'next/image'
import NewQuestion from '../CreateQuizForm/NewQuestion/NewQuestion'

// courtesy of matt g perry - https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?from-embed=&file=/src/Example.tsx:197-520
const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
    }
  }
}

const Carousel = ({arr, toggle, myRef,...props}: any) => {
    // includes direction to use enter/exit variants in altering ways
    const [[page, direction], setPage] = useState([0, 0])
    
    // courtesy of matt g perry - https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?from-embed=&file=/src/Example.tsx:197-520
    let quizIdx = wrap(0, arr.length, page) // wraps page around based on our first two arguments
    
    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection])
    }

    useEffect(() => {
        setPage([arr.length-1, 1])
        quizIdx = wrap(0, arr.length, page)
    }, [arr.length])

    let flag = false

    return (<>

        <AnimatePresence initial={false} mode="wait">
          
          <motion.div className="relative overflow-hidden cursor-pointer" ref={myRef} 
            drag="x" 
            dragSnapToOrigin
            dragConstraints={{ left: -100, right: 100 }} 
            // onDrag={
            //   (e, info) => {
            //     if (info.velocity.x > 500 && info.offset.x > 100 && !flag) {
            //       flag = true
            //       paginate(1)
            //     }
            //     else flag = false
            //     console.log(info)
            //   }
            // }
          >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                      key={page}
                      custom={direction} // custom arguments for function variants
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                          x: { type: "spring", stiffness: 400, damping: 30 }
                      }}
                  >
                    <NewQuestion question={arr[quizIdx]} index={quizIdx} {...props}/>
                  </motion.div>
              </AnimatePresence>
          </motion.div>

          { arr.length > 1 && <>
                <div className="absolute top-1/2 right-[-25px] text-3xl text-[var(--txt3)] cursor-pointer" onClick={() => paginate(1)}>{"‣"}</div>
                <div className="absolute top-1/2 left-[-25px] rotate-180 text-3xl text-[var(--txt3)] cursor-pointer" onClick={() => paginate(-1)}>{"‣"}</div>
              </>}
        </AnimatePresence>

    </>)
}

export default Carousel 