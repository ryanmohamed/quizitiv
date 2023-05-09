import react, { useState } from 'react'
import styles from './XPBar.module.css'


const levels: any = {
    "Level 1": 0,
    "Level 2": 40,
    "Level 3": 100,
    "Level 4": 200,
    "Level 5": 290,
    "Level 6": 400,
    "Level 7": 525,
    "Level 8": 675,
    "Level 9": 850,
    "Level 10": 1100,
    "Level 11": 1400
} 

const unlocksAvailableAfter: any = {
    "Level 2": "Themes",
    "Level 4": "Game Room"
}

const getLevel = (xp: number) => {
    let level: string = "Level 1"
    for (let key in levels) {
        if (xp < levels[key])
            break 
        level = key
    }
    return level
}

const getRange = (level: string) => {
    const keys = Object.keys(levels)
    const nextIdx = keys.indexOf(level) + 1
    if (nextIdx >= keys.length)
        return {
            min: levels[level]
        }
    return {
        min: levels[level], 
        max: levels[keys[nextIdx]]
    }
}

const getPct = (xp: number) => {
    const level = getLevel(xp)
    const range = getRange(level)
    return (xp - range.min) / (range.max - range.min) * 100
}

const XPBar = ({xp, ...props}: any) => {
    const [level, setLevel] = useState<string>(getLevel(xp))
    return (
        <div className={styles.Container}>
            <div className="flex w-full justify-end text-3xl mb-3 opacity-70">
                <p>{level}</p>
            </div>
            <div className={styles.BarContainer}>
                { level && <p>{getRange(level).min}</p> }
                <div className={styles.Bar}>
                    <p className="absolute left-1/2 top-1/2 opacity-90 text-white">{xp}</p>
                    <div style={{ width: `${getPct(xp)}%`, position: "relative" }}>
                        <p className='absolute'>😎</p>
                    </div>
                </div>
                { (level && getRange(level)?.max) && <p>{getRange(level)?.max}</p> }
            </div>
            { unlocksAvailableAfter[level] && <>
            
                <div className="w-full flex flex-col items-end justify-center mt-4 text-xl text-right text-[var(--txt4)]">Unlock available at next level!
                    <span className="w-fit px-2 mt-2 ml-2 rounded-sm border-[1px] border-[#257bdf] text-[var(--txt4)]">{unlocksAvailableAfter[level]}</span>
                </div>
                
            </> }
        </div>
    )
}

export default XPBar