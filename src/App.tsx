

import { createBrowserRouter, LoaderFunctionArgs, NavLink, RouteObject, RouterProvider, useLoaderData } from 'react-router-dom'
import { ProductViewer } from './ProductViewer'
import { Product } from './Types'

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
    const products = [ 17, 40, 56, 77, 89 ]
    return (
        <div className="flex-1 bg-orange-200">
            <div className="flex flex-row gap-4 flex-wrap justify-center">
                {products.map((id) => (
                    <NavLink key={id} to={"/product/" + id}>
                        <div className="bg-white p-4 m-2 rounded-lg shadow-xl border border-gray-200 flex flex-col gap-2">
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


