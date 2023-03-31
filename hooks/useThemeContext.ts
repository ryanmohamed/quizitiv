import { useContext } from "react"
import { ThemeContext } from "../context/ThemeProvider"

const useThemeContext = () : any => {
    return useContext(ThemeContext)
}

export default useThemeContext
