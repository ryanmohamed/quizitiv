const Menu = ({fill, ...props}: any) => {
    return ( 
        <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36" fill={fill} {...props} >
            <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/>
        </svg>
    )
}

export default Menu