import { ReactElement } from "react";
import type { NextPageWithLayout } from '../../_app'
import Level5Layout from "@/layout/Level5Layout/Level5Layout";

const Asteroid: NextPageWithLayout = () => {
    return (<main className="h-96 flex items-center justify-center">
        <h1>Coming *soon*</h1>
    </main>)
}

Asteroid.getLayout = function getLayout(page: ReactElement) {
    return (
        <Level5Layout>
            {page}
        </Level5Layout>
    )
}

export default Asteroid