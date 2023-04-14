import { createContext, useEffect, useState } from "react"

const ThemeContext = createContext(undefined)

const ThemeProvider = ({children}: any) => {
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

    return (
        <ThemeContext.Provider value={val}>
            { children }
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }
