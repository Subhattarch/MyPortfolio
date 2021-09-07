export default ({
    name, 
    href
}) => {
    const aRef = React.useRef()
    const [iFrameScale, setScale] = React.useState(1)
    React.useEffect(() => {
        let updateScale = () => setScale(
            $(aRef.current).width() / 1024
            )
        $(window).resize(updateScale)
        updateScale()
    }, [])
    return <a 
        href={href} 
        id={name}
        ref={aRef}
    >
        <div style={{height: iFrameScale * 768}}><iframe 
        src={href} 
        width="1024px"
        height="768px"
        frameBorder="0"
        style={{
            transform: `scale(${iFrameScale})`
        }}></iframe></div>
        <h3>{name.replace(/-/g, " ")}</h3>
    </a>
}