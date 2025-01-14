import { ReactNode, useEffect } from "react"
import { createBrowserRouter, NavLink, Outlet, RouterProvider, useLocation, useNavigate, useNavigation, useParams } from "react-router-dom"
import { ProductDetails, Products, ProductType } from "./Products"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { TransitionLink } from "./TransitionLink"

const router = createBrowserRouter(
    [{
        path: "/", element: <Main></Main>, children: [
            { path: "/", element: <div>At Home</div> },
            { path: "/products", element: <Products></Products> },
            { path: "/product/:id", element: <ProductPage></ProductPage> },
            { path: "/about", element: <div>About</div> },
            { path: "/imprint", element: <div>Impressum</div> },
            { path: "*", element: <div>Not found</div> },
        ]
    }
    ]
)

export function useProduct(id: number) {
    return useQuery({
        queryKey: ["product", id],
        staleTime: 60_000,
        queryFn: async () => {
            const r = await fetch("https://dummyjson.com/products/" + id)
            return await r.json() as ProductType
        }
    })
}

export function ProductPage() {
    const { id } = useParams()
    const { data: product } = useProduct(Number.parseInt(id || "-1"))
    return product && (
        <ProductDetails product={product}></ProductDetails>)
}


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
        <TransitionLink to="/">Home</TransitionLink>
        <TransitionLink to="/products">Products</TransitionLink>
        <TransitionLink to="/about">About</TransitionLink>
        <TransitionLink to="/imprint">Impressum</TransitionLink>
    </div>)
}

export function Box({ children }: { children: ReactNode }) {
    return (<div className="h-1 grow bg-white shadow-xl 
        rounded-lg border border-gray-300 p-4 m-4 flex flex-col">
        {children}
    </div>)
}

export function Main() {
    return (<div className="grow bg-gray-200 flex flex-col">
        <MenuBar></MenuBar>
        <Box><Outlet></Outlet></Box>
        <Footer></Footer>
    </div>)
}

export function Footer() {
    const location = useLocation()
    useEffect(() => {
        console.log("log visit: " + location.pathname)
    }, [location])
    return (<div className="bg-white px-6 py-2 border-t border-gray-300">
        {location.pathname}
    </div>)
}

