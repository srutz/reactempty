import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom"

const router = createBrowserRouter(
    [
    { path: "/", element: <Main></Main>, children: [
        { path: "/", element: <div>At Home</div> },
        { path: "/about", element: <div>About</div> },
        { path: "/imprint", element: <div>Impressum</div> },
    ]} 
    ]
)
export function App() {
    return (<RouterProvider router={router}></RouterProvider>)
}

export function Main() {
    return (
        <div className="grow bg-gray-200 flex flex-col">
            <div className="bg-white p-2 border-b border-gray-300 flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/imprint">Impressum</Link>
            </div>

            <div className="flex-1 bg-white shadow-xl 
                rounded-lg border border-gray-300 p-4 m-4">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

