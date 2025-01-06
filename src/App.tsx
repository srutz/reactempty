
export function App() {
    const leute = [ "Frank", "Hans", "Rudi", "Gisela" ]
    return (
        <div className="text-3xl">
            {leute.map((l) => (<Greeting message={l} />))}
        </div>
    )
}

function Greeting(props : { message: string}) {
    const v =  <div>Ich grüße dich {
        props.message == "Frank" ? "NICHT" : props.message}</div>
    return v
}

