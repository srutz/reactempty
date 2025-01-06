
export function App() {
    const leute = [ "Frank", "Hans", "Rudi", "Gisela" ]
    return (
        <div className="text-3xl">
            {leute.map((l,i) => (<Greeting key={i} message={l} />))}
        </div>
    )
}

function Greeting(props : { message: string}) {
    let count = 1
    const inc = () => {
        console.log("inc clicked " + props.message)
        count++
    }
    return <div onClick={inc}>
        Ich grüße dich {count} mal {props.message}
        </div>
}

