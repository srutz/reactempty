import { ReactNode, useState } from "react"

export type ButtonProps =  { clicked: () => void, children: ReactNode }

export function PrimaryButton(props: ButtonProps) {
    return <button className="pbutton" onClick={props.clicked}>Toggle</button>
}

export function SecondaryButton(props: ButtonProps) {
    return <button className="sbutton" onClick={props.clicked}>Toggle</button>
}

export function Button(props: ButtonProps & { buttontype: "prim" | "sec" }) {
   return props.buttontype == "prim"
    ? <PrimaryButton {...props}></PrimaryButton>
    : <SecondaryButton {...props}></SecondaryButton>
}

export function ShadowAndBorder(props: { children: ReactNode }) {
    return <div className="m-4 flex flex-col gap-2 shadow-xl border border-red-300 p-4 rounded-lg">
        {props.children}
    </div>
} 

export function CollapseMe(props: { children: ReactNode}) {
    const [open,setOpen] = useState(false)
    return <ShadowAndBorder>
        {open && props.children}
        <Button buttontype="prim" clicked={() => setOpen(!open)}>Toggle</Button>
        
    </ShadowAndBorder>
}

export function App() {
    return <CollapseMe><h1>hi ehre</h1><div>oiewf</div></CollapseMe>
}

