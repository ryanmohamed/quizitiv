import { createContext, useEffect, useState } from "react"
import useFirebaseUserContext from "@/hooks/useFirebaseUserContext"

const ThemeContext = createContext(undefined)

const ThemeProvider = ({children}: any) => {
    const { user } = useFirebaseUserContext()
    const [ darkMode, setDarkMode ] = useState<boolean>(false)
    const val: any = { darkMode, setDarkMode } // verify type from value in provider later
    
    useEffect(() => {
        const root = document.documentElement
        const pairs = [
            ["--bg1", "--txt1"],
            ["--bg2", "--txt2"],
            ["--bg3", "--txt3"],
            ["--bg4", "--txt4"],
            ["--bg5", "--txt5"],
            ["--shadow-light", "--shadow-dark"],
        ]
        for (const pair of pairs) {
            const primary = getComputedStyle(root).getPropertyValue(pair[0])
            const secondary = getComputedStyle(root).getPropertyValue(pair[1])
            root.style.setProperty(pair[1], primary)
            root.style.setProperty(pair[0], secondary)
        }
    }, [darkMode])

    useEffect(() => {
        const root = document.documentElement
        const pairs = [
            ["--bg1", "--txt1"],
            ["--bg2", "--txt2"],
            ["--bg3", "--txt3"],
            ["--bg4", "--txt4"],
            ["--bg5", "--txt5"]
        ]
        let i = 0
        const color = {
            bg: ['rgb(245 245 244)', 'rgb(209, 213, 219)', '#EFEFEF', '#D9D9D9', '#E6E6E6'], 
            txt: ['rgb(23, 23, 23)', 'rgb(39, 39, 42)', '#1f1f1f', '#626262', '#888888']
        }
        for (const pair of pairs) {
            root.style.setProperty(pair[0], color.bg[i])
            root.style.setProperty(pair[1], color.txt[i])
            i++
        }
    }, [user])

    return (
        <ThemeContext.Provider value={val}>
            { children }
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }
