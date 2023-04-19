import Link from "next/link"
import styles from './Story.module.css'

const Story = () => {
    return (
        <div className={styles.Story}>
            <section>
                <h1>What is Quizitiv?</h1>
                <p>Quizitiv is platform for creating and taking quizzes in a knowledge-sharing based community.</p>
                <p>Taking quizzes created by others and scoring enough can grant you experience points (XP).</p>

                <p>Gain XP, increase your level, and gain access to some hidden features in the site.</p>
                <p>This can be access to games, new themes, and more. </p>
            </section>

            <section>
                <h1> Wanna try a quiz? </h1>
                <p>Head to the Community page, where you can find quizzes made by others.</p>
                <p>Try the latest, most recent quizzes, or even search for something you have your eye on.</p>
                <Link href="/community" style={{ width: 'fit-content', borderRadius: '2em', display: 'block' }}>
                    <div className="w-fit px-4 py-2 border-2 border-sky-600 font-[Bangers] text-lg rounded-3xl hover:scale-105 transition">
                        <p>Take me to the community page</p>
                    </div>
                </Link>
            </section>

            <section>
                <h1> Wanna make your own? </h1>
                <p>Head to the Dashboard page, where you can find quizzes you&apos;ve taken, quizzes you&apos;ve made, and the ability to create or modify your own!</p>
                <Link href="/dashboard" style={{ width: 'fit-content', borderRadius: '2em', display: 'block' }}>
                    <div className="w-fit px-4 py-2 border-2 border-sky-600 font-[Bangers] text-lg rounded-3xl hover:scale-105 transition">
                        <p className="">Take me to the Dashboard page</p>
                    </div>
                </Link>
            </section>

        </div>
    )
}

export default Story