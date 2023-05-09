import { useEffect } from "react"
import useFirebaseFirestoreContext from "@/hooks/useFirebaseFirestoreContext"
import { toast } from "react-toastify"

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

const unlocksAvailableOn: any = {
    "Level 3": "Themes",
    "Level 5": "Game Room"
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

const ToastOnXP = ({children}: any) => {
    const { dbUser } = useFirebaseFirestoreContext() 
    useEffect(() => {
        const level = getLevel(dbUser?.xp)
        if (unlocksAvailableAfter[level]) {
            toast("🚨 Unlock available at next level! 🚨")
            delete unlocksAvailableAfter[level]
        }
        if (unlocksAvailableOn[level]) {
            toast("🔎 Unlock available now! Go exploring! 🔎")
            delete unlocksAvailableOn[level]
        }
    }, [dbUser?.xp])
    return <div>{children}</div>
}

export default ToastOnXP