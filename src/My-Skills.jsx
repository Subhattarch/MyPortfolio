import {delay} from "./small-functions.js"
const DOM = document.querySelector("#DOM-Skills")

let MySkills = () => {
    const IsMotionReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
    let intersectionObserverRef = React.useRef(
        new IntersectionObserver(delay(entries => {
            entries.forEach(entrie => {
                if(entrie.isIntersecting || IsMotionReduced) {
                    if(!IsMotionReduced) $(entrie.target).css(
                        "--animation-ofset", "150vw"
                    )
                    return setTimeout(() => {
                        $(entrie.target).css("--opacity", "1")
                    }, 100)
                }
                $(entrie.target).css(
                    "--animation-ofset", "-150vw"
                )
                setTimeout(() => {
                    $(entrie.target).css("--opacity", "0")
                }, 100)
            })
        }), {
            threshold: 1
        })
    )
    let intersectionObserver = intersectionObserverRef.current
    const [Skills, SetSkills] = React.useState({
        BestAt: [],
        AlsoKnow: []
    })
    React.useEffect( () => {
        $.get( 
            "./Skills.json", 
            skills => SetSkills(skills)
        )
    }, [] )
    return <>
        <section id="I-am-best-at">
            <h2>I'm best at</h2>
            {
                Skills.BestAt.map( (skill, index) => <h3
                    key={index}
                    style={({
                        color: skill.color
                    })}
                    ref={bestSkill => {
                        intersectionObserver.observe(bestSkill)
                    }}><span
                        style={({
                            opacity: "var(--opacity)"
                        })}
                    >{skill.name}</span></h3>)
            }
        </section>
        <section id="I-also-know">
            <h2>I also know</h2>
            {
                Skills.AlsoKnow.map( (skill, index) => <h4 
                    key={index}
                >{skill}</h4>)
            }
        </section>
    </>
}

ReactDOM.render(<MySkills />, DOM)