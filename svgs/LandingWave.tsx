const LandingWave = ({fill, ...props}: any) => {
    return ( <svg style={props.svgstyle} xmlns="http://www.w3.org/2000/svg" id="visual" viewBox="0 0 900 600" width="900" height="600" version="1.1">
        <path {...props} d="M0 81L30 85.8C60 90.7 120 100.3 180 94.8C240 89.3 300 68.7 360 59.3C420 50 480 52 540 60.8C600 69.7 660 85.3 720 85.3C780 85.3 840 69.7 870 61.8L900 54L900 0L870 0C840 0 780 0 720 0C660 0 600 0 540 0C480 0 420 0 360 0C300 0 240 0 180 0C120 0 60 0 30 0L0 0Z" strokeLinecap="round" strokeLinejoin="miter"/>
    </svg>
    )
}

export default LandingWave