import { ReactNode, useEffect } from "react"
import { createBrowserRouter, NavLink, Outlet, RouterProvider, useLocation, useNavigate, useNavigation } from "react-router-dom"
import { Products } from "./Products"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const router = createBrowserRouter(
    [ { path: "/", element: <Main></Main>, children: [
        { path: "/", element: <div>At Home</div> },
        { path: "/products", element: <Products></Products> },
        { path: "/about", element: <div>About</div> },
        { path: "/imprint", element: <div>Impressum</div> },
    ]} 
    ]
)

const client = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={client}>
            <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
    )
}
export function MenuBar() {
    return (<div className="bg-white px-6 py-2 border-b border-gray-300 flex gap-4">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
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
        <MenuBar></MenuBar>
        <Box><Outlet></Outlet></Box>
        <Footer></Footer>
    </div>)}

export function Footer() {
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        console.log("log visit: " + location.pathname)
        if (location.pathname == "/imprint") {
            navigate("/about")
        }
    }, [ location ])
    return (<div className="a999 bg-white px-6 py-2 border-t border-gray-300">
        {location.pathname}
    </div>)
}

