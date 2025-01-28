import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import { createBrowserRouter, createHashRouter, NavLink, Outlet, RouterProvider, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { TransitionLink } from "./TransitionLink"

const router = createBrowserRouter(
    [
        { 
            path: "/", 
            element: <AppFrame></AppFrame>,
            children: [
                { path: "/", element: <App></App> },
                { path: "/products", element: <App></App> },
                { path: "/products/:id", element: <SingleProduct/> },
                { path: "/imprint", element: <Imprint/> },
                { path: "/*", element: <div>wildcardcatchall</div> },
            ]
        },
    ]
)

export function SingleProduct() {
    const { id } = useParams()
    const { data } = useProduct(Number.parseInt(id || "-1"))
    return (
        <div className="flex flex-col gap-2 items-center">
            <h1 className="text-2xl font-bold mt-4">Produktdetails</h1>
            <ProductPanel product={data} ></ProductPanel>
        </div>
    )
}

export function AppFrame() {
    return (<div className="h-full flex flex-col">
        <MenuBar></MenuBar>
        <Content></Content>
        <Footer></Footer>
    </div>)
}

export function Footer() {
    return (<div className="bg-white border-t border-gray-500 h-8">...</div>)
}

export function MenuBar() {
    return (<div className="bg-white h-16 flex gap-2 items-center px-2">
        <TransitionLink to="/">Home</TransitionLink>
        <TransitionLink to="/imprint">Imprint</TransitionLink>
        </div>)
}

export function Content() {
    return (<div className="h-1 grow flex flex-col">
        <Outlet></Outlet>
    </div>)
}

export function RouterMain() {
    return (<RouterProvider router={router}></RouterProvider>)
}

export function Imprint() {
    return (
        <div className="p-4">
            <h1>Imprint</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    )
}


export type Product = {
    id: number
    title: string
    description: string
    price: number
    thumbnail: string
    rating: number
    stock: number
    images: string[]
}

const baseUrl = "https://dummyjson.com/products/"

export function usePrefetch() {
    const queryClient = useQueryClient()
    useEffect(() => {
        for (let i = 1; i <= 20; i++) {
            queryClient.prefetchQuery({
                queryKey: ["products", i],
                queryFn: async () => {
                    const response = await fetchPage(i)
                    return response.data
                }
            })
        }
    }, [])
}

const PAGESIZE = 20
function fetchPage(page: number) {
    return axios.get(baseUrl 
        + "?limit=" +PAGESIZE
        + "&skip=" + ((page - 1) * PAGESIZE))    
}

export function useProducts(page: number) {
    const result = useQuery({
        queryKey: ["products", page],
        queryFn: async () => {
            const response = await fetchPage(page)
            return response.data as { "products": Product[] }
        },
        placeholderData: (prev) => { return prev },
        staleTime: 3_600_000
    })
    return result
}

export function useProduct(id: number) {
    const result = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const response = await axios.get(baseUrl + id)
            return response.data as Product
        },
        staleTime: 3_600_000
    })
    return result
}


export function App() {
    const [ p ] = useSearchParams()
    const page = Number.parseInt(p.get("page")||"-1") || 1
    const navigate = useNavigate()
    const { data, isPending } = useProducts(page)
    if (isPending) { return <div>still loading</div> }
    return (
        <div className="grow h-full flex gap-2">
            <div className="flex flex-col gap-2">
                <div className="grow flex flex-wrap gap-2 p-2
                        justify-center overflow-y-auto">
                    {data?.products.map((p) => (
                        <div key={p.id} className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => navigate("/products/" + p.id)}>
                            <ProductPanel key={p.id} product={p} />
                        </div>
                    ))}
                </div>
                <div className="p-4 flex gap-2 justify-center">
                <button disabled={page <= 1} 
                        onClick={() => navigate("/products?page=" + (page - 1))}>
                        Prev</button>
                    <button onClick={() => navigate("/products?page=" + (page + 1))}>
                        Next</button>
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    )
}
function formatGerman(n: number) {
    return new Intl.NumberFormat("de", {
        currency: "EUR"
    }).format(n)
}

export function ProductPanel({ product }: { product?: Product }) {
    if (!product)
        return undefined
    return (
        <div className="bg-white p-4 m-2 shadow-xl w-[440px] h-[188px]
                relative rounded-lg flex flex-col">
            { /* oberer bereich */}
            <div className="h-1 grow flex gap-8 items-stretch">
                {/* linke seite */}
                <div className="flex flex-col justify-between gap-2">
                    <div className="w-32">
                        <img src={product.thumbnail} ></img>
                    </div>
                    <div className="font-bold text-center">
                        {formatGerman(product.price)}€
                    </div>
                </div>
                {/* rechte seite */}
                <div className="flex flex-col gap-2">
                    <div>{product.title}</div>
                    <div className="text-gray-600 overflow-hidden">{product.description}</div>
                </div>
            </div>
        </div>
    )
}

