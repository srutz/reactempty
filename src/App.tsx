import { ReactNode } from "react"
import { createBrowserRouter, NavLink, Outlet, RouterProvider } from "react-router-dom"

const router = createBrowserRouter(
    [ { path: "/", element: <Main></Main>, children: [
        { path: "/", element: <div>At Home</div> },
        { path: "/about", element: <div>About</div> },
        { path: "/imprint", element: <div>Impressum</div> },
    ]} 
    ]
)
export function App() {
    return (<RouterProvider router={router}></RouterProvider>)
}
export function MenuBar() {
    return (<div className="bg-white px-6 py-2 border-b border-gray-300 flex gap-4">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/imprint">Impressum</NavLink>
    </div>)}

export function Box({children } : { children: ReactNode }) {
    return (<div className="h-1 grow bg-white shadow-xl 
        rounded-lg border border-gray-300 p-4 m-4">
        {children}
    </div>)}

export function Main() {
    return (<div className="grow bg-gray-200 flex flex-col">
        <MenuBar></MenuBar><Box><Outlet></Outlet></Box>
    </div>)}

