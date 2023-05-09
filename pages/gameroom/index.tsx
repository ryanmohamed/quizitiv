import { ReactElement } from "react";
import type { NextPageWithLayout } from '../_app'
import Level5Layout from "@/layout/Level5Layout/Level5Layout";
import styles from "./GameRoom.module.css";
import Link from "next/link"

const GameRoom: NextPageWithLayout = () => {
    return (<main className={styles.GameRoom}>
        <header>
            <h1 className="text-5xl py-20 px-12 border-b-2 border-[var(--bg4)] ">Game Room</h1>
        </header>
        
        <section className="py-20 px-12">
            <Link href="/gameroom/asteroids">
                <p className="text-blue-600 border-bottom border-b-2 w-fit">Asteroids 🔗</p>
            </Link>
        </section>
    </main>)
}

GameRoom.getLayout = function getLayout(page: ReactElement) {
    return (
        <Level5Layout>
            {page}
        </Level5Layout>
    )
}

export default GameRoom