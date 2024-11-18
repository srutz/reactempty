

import { createBrowserRouter, LoaderFunctionArgs, NavLink, RouteObject, RouterProvider, useLoaderData } from 'react-router-dom'
import { ProductViewer } from './ProductViewer'
import { Product } from './Types'
import { useEffect } from 'react'

const routes = [
    { path: "/", Component: Main },
    { 
        path: "/product/:id", 
        Component: ProductScreen,
        loader: async (args: LoaderFunctionArgs) => {
            const { params } = args
            const response = await fetch("https://dummyjson.com/product/" + params.id)
            const product = await response.json()
            return { product }
        }
    }
] satisfies RouteObject[]

const router = createBrowserRouter(routes)

export function App() {
    return <RouterProvider router={router} />
}


function Main() {
    const products = [ 7, 8, 20, 25, 30, 37, 40, 42, 45, 50 ]
    useEffect(() => {
        products.forEach((id, index) => {
            const element = document.getElementById("product" + id)
            setTimeout(() => element?.classList.add("motion-running"), 50 + (index * 50))
        })
    }, [])
    return (
        <div className="flex-1 bg-gradient-to-br from-white to-indigo-300">
            <div className="flex flex-row gap-4 flex-wrap justify-center">
                {products.map((id, index) => (
                    <NavLink key={id} to={"/product/" + id} id={"product" + id} className=" motion-ease-spring-bouncier motion-scale-in-0 motion-paused">
                        <div className="bg-white p-4 m-2 rounded-lg shadow-xl flex flex-col gap-2">
                            <div className="text-lg font-bold">Produkt {id}</div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

function ProductScreen() {
    const { product } = useLoaderData() as { product: Product }
    return (
        <div className="flex-1 bg-gray-100 flex flex-col items-center"><ProductViewer product={product}></ProductViewer></div>
    )
}


