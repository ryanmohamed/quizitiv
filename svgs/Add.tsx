const Add = ({fill, stroke, sub, ...props}: any) => {
    return ( <svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M9 12H15" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        { sub === true && <path d="M12 9L12 15" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> }
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={stroke} strokeWidth="2"/>
        </svg>
    )
}

export default Add