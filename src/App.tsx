
export function App() {
    const names = [ "Schalke04", "BVB", "Werder", "1.FC Köln"]
    return ( 
        <div className="text-3xl">
            {names.map((n) => (<Box extra={n}></Box>))}
        </div>
    )}


function Box(props : { extra?: string}) {
    return (
        <div className="m-4 p-4 rounded-lg shadow-xl
            border border-gray-300
            bg-white flex flex-col motion-preset-slide">
                {props.extra}
        </div>

    )
}
