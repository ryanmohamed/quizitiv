import NotLoggedIn from "@/components/NotLoggedIn/NotLoggedIn"
import useFirebaseUserContext from "../../hooks/useFirebaseUserContext"
import ToastOnXP from "@/components/ToastOnXP/ToastOnXP"


export default function UserLayout ({children}: any) {
    const { user } = useFirebaseUserContext()
    if ( user === undefined || user === null )
        return (<NotLoggedIn />)
    return <main>
        <ToastOnXP />
        {children}
    </main>
}