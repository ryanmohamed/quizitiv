import styles from './Footer.module.css'
const Footer = () => {
    return (
        <footer className="h-84 w-full flex flex-col bg-grey-700 py-20 px-10">
            <h1 className="text-6xl">Quizitiv</h1> 
            <div className="flex w-fit mt-10" >
                <ul className="mx-10">
                    <span className="text-slate-400 text-2xl">Contribute</span>
                    <li className="text-slate-600 ml-2 mt-2"><a href="mailto:reyaznyc@gmail.com">Email</a></li>
                    <li className="text-slate-600 ml-2 mt-2"><a>Github</a></li>
                </ul>
                <ul>
                    <span className="text-slate-400 text-2xl">About Us</span>
                    <li className="text-slate-600 ml-2 mt-2"><a href="mailto:reyaznyc@gmail.com">Email</a></li>
                    <li className="text-slate-600 ml-2 mt-2"><a>LinkedIn</a></li>
                    <li className="text-slate-600 ml-2 mt-2"><a>Github</a></li>
                    <li className="text-slate-600 ml-2 mt-2"><a>Other Projects</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer