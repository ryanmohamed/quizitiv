const Light = ({fill, stroke, ...props}: any) => {
    return (<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <path stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12h1m-3.5-6.5 1-1M12 3V2M5.5 5.5l-1-1M3 12H2m8 10h4m3-10a5 5 0 1 0-7 4.584V19h4v-2.416A5.001 5.001 0 0 0 17 12z"/>
    </svg>)
}

export default Light