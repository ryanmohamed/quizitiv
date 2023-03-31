import { createContext, useEffect, useState } from "react"

const ThemeContext = createContext(undefined)

const ThemeProvider = ({children}: any) => {
    const [ darkMode, setDarkMode ] = useState<boolean>(false)
    const val: any = { darkMode, setDarkMode } // verify type from value in provider later
    
    useEffect(() => {
        const root = document.documentElement
        const bg1 =  getComputedStyle(root).getPropertyValue('--bg1')
        const txt1 =  getComputedStyle(root).getPropertyValue('--txt1')
        const shadowDark =  getComputedStyle(root).getPropertyValue('--shadow-dark')
        const shadowLight =  getComputedStyle(root).getPropertyValue('--shadow-light')
        console.log(root.style)
        root.style.setProperty('--bg1', txt1)
        root.style.setProperty('--txt1', bg1)
        root.style.setProperty('--shadow-dark', shadowLight)
        root.style.setProperty('--shadow-light', shadowDark) 
    }, [darkMode])

    return (
        <ThemeContext.Provider value={val}>
            { children }
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }
