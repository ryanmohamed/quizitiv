import LowLevel from "@/components/LowLevel/LowLevel"
import NotLoggedIn from "@/components/NotLoggedIn/NotLoggedIn"
import useFirebaseFirestoreContext from "@/hooks/useFirebaseFirestoreContext"
import useFirebaseUserContext from "../../hooks/useFirebaseUserContext"

export default function Level3Layout ({children}: any) {
    const { user } = useFirebaseUserContext()
    const { dbUser } = useFirebaseFirestoreContext()
    if ( user === undefined || user === null || dbUser === undefined || dbUser === null )
        return (<NotLoggedIn />)
    else if ( dbUser?.xp < 100 )
        return (<LowLevel />)
    return <main>
        {children}
    </main>
}