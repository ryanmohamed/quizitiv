import useFirebaseUserContext from "@/hooks/useFirebaseUserContext";
import { ReactElement, useEffect, useState } from "react";
import type { NextPageWithLayout } from '../_app'

import useFirebaseFirestoreContext from "@/hooks/useFirebaseFirestoreContext";
import Level3Layout from "@/layout/Level3Layout/Level3Layout";

import styles from "./Settings.module.css";

const Colors = ({color1, color2}: any) => {
    return (
        <div className="flex">
            <div className={`h-[25px] w-[25px] rounded-lg border-[1px] mr-2 border-white`} style={{ backgroundColor: color1 }} ></div>
            <div className={`h-[25px] w-[25px] rounded-lg border-[1px] border-white`} style={{ backgroundColor: color2 }} ></div>
        </div>
    )
}

const Settings: NextPageWithLayout = () => {
    const { user } = useFirebaseUserContext()
    const { dbUser } = useFirebaseFirestoreContext()
    const [ theme, setTheme ] = useState<any>(null)

    const colors: any = {
        'default': {
            bg: ['rgb(245 245 244)', 'rgb(209, 213, 219)', '#EFEFEF', '#D9D9D9', '#E6E6E6'], 
            txt: ['rgb(23, 23, 23)', 'rgb(39, 39, 42)', '#1f1f1f', '#626262', '#888888']
        },

        'mellow': {
            bg: ['#dca7df', '#ff949b', '#fc97b6', '#ef9ecd', '#c6b0eb'], 
            txt: ['#ffeeea', '#ffe5df', '#ffe0da', '#ffdcd5', '#ffd3ca']
        },

        'aqua': {
            bg: ['#0026ff', '#3351ff', '#4d67ff', '#0075d6', '#2647ff'], 
            txt: ['#4dc6ff', '#33beff', '#ccd4ff', '#e5e9ff', '#ebeeff']
        },

        'candy': {
            bg: ['#a3009e', '#c200b9', '#e000d5', '#ff00f2', '#860083'], 
            txt: ['#ffebfe', '#ffe0fd', '#ffdbfd', '#ffd1fd', '#ffccfc']
        },

    } 

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
        if(colors.hasOwnProperty(theme)) {
            const color = colors[theme]
            for (const pair of pairs) {
                root.style.setProperty(pair[0], color.bg[i])
                root.style.setProperty(pair[1], color.txt[i])
                i++
            }
        }
        
    }, [theme])
    
    return (<main className={styles.Settings}>
        <header>
            <h1 className="text-5xl py-20 px-12 border-b-2 border-[var(--bg4)] ">Settings</h1>
        </header>
        
        <section className="py-20 px-12">
            <h1 className="text-3xl font-[Oswald]">Select theme</h1>
            <div className="flex flex-col font-[Oswald] mt-8 ml-4">
                
                <label className="mb-8 text-2xl flex items-center justify-between w-[200px] h-[50px] border-2 border-bg[var(--txt)] p-4 rounded-2xl hover:opacity-80 hover:border-[var(--txt5)] hover:bg-[var(--bg5)] cursor-pointer transition">
                    <input type="radio" name="theme" value="default" onChange={(e) => {
                        if(e.target.checked) { setTheme(e.target.value) }
                    }}/>
                    <p>Default</p>
                    <Colors color1={colors["default"].bg[0]} color2={colors["default"].txt[0]} />
                </label>

                <label className="mb-8 text-2xl flex items-center justify-between w-[200px] h-[50px] border-2 border-bg[var(--txt)] p-4 rounded-2xl hover:opacity-80 hover:border-[var(--txt5)] hover:bg-[var(--bg5)] cursor-pointer transition">
                    <input type="radio" name="theme" value="mellow" onChange={(e) => {
                        if(e.target.checked) { setTheme(e.target.value) }
                    }}/>
                    <p>Mellow</p>
                    <Colors color1={colors["mellow"].bg[0]} color2={colors["mellow"].txt[0]} />
                </label>

                <label className="mb-8 text-2xl flex items-center justify-between w-[200px] h-[50px] border-2 border-bg[var(--txt)] p-4 rounded-2xl hover:opacity-80 hover:border-[var(--txt5)] hover:bg-[var(--bg5)] cursor-pointer transition">
                    <input type="radio" name="theme" value="aqua" onChange={(e) => {
                        if(e.target.checked) { setTheme(e.target.value) }
                    }}/>
                    <p>Aqua</p>
                    <Colors color1={colors["aqua"].bg[0]} color2={colors["aqua"].txt[0]} />
                </label>

                <label className="mb-8 text-2xl flex items-center justify-between w-[200px] h-[50px] border-2 border-bg[var(--txt)] p-4 rounded-2xl hover:opacity-80 hover:border-[var(--txt5)] hover:bg-[var(--bg5)] cursor-pointer transition">
                    <input type="radio" name="theme" value="candy" onChange={(e) => {
                        if(e.target.checked) { setTheme(e.target.value) }
                    }}/>
                    <p>Candy</p>
                    <Colors color1={colors["candy"].bg[0]} color2={colors["candy"].txt[0]} />
                </label>

            </div>
        </section>
    </main>)
}

Settings.getLayout = function getLayout(page: ReactElement) {
    return (
        <Level3Layout>
            {page}
        </Level3Layout>
    )
}

export default Settings