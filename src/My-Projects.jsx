import ProjectTile from "./Project-Tile.js"

let DOM = document.querySelector("#DOM-Projects")

let MyProjects = () => {
    let projectsRef = React.useRef()
    let projects = projectsRef.current
    const [Projects, SetProjects] = React.useState([{
        name: "placeholder", 
        href: "",
        key: 0
    }])
    const [
        ProjectDisplayNumber, 
        SetProjectDisplayNumber
    ] = React.useState(6)
    React.useEffect(
        () => $.get("./Projects.json", data => {
            projects = data.map(
               (Data, index) => ({...Data, key: index})
            )
            projectsRef.current = projects
            SetProjects(
                projects.slice(
                    0, ProjectDisplayNumber
                )
            )
        }), [])
    React.useEffect(() => {
        if(Array.isArray(projects)) return SetProjects(
            projects.slice(
                0, ProjectDisplayNumber
            )
        )
    }, [ProjectDisplayNumber])
    let ShowMore = () => SetProjectDisplayNumber(
        ProjectDisplayNumber => ProjectDisplayNumber + 6
    )
    let ShowLess = () => SetProjectDisplayNumber(6)
    return <>
        {Projects.map(
            Project => <ProjectTile {...Project} />
        )}
        {projects && projects.length > 6 && <input 
        type="button" {
            ...(Projects.length < projects.length ? {
                onClick: ShowMore,
                value: "Show More"
            } : {
                onClick: ShowLess,
                value: "Show Less"
            })
        } />}
    </>
}

ReactDOM.render(<MyProjects />, DOM)
