import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { createBrowserRouter, NavLink, Outlet, RouterProvider, useNavigate } from "react-router-dom"
import { ProductDetailsView } from "./ProductDetails"

export type Product = {
    id: number,
    title: string,
    description: string,
    rating: number,
    price: number,
    thumbnail: string,
    images: string[],
}

export function formatMoney(n: number) {
    const nf = new Intl.NumberFormat("de-DE", {
        currency: "EUR", 
        style: "currency" })
    return nf.format(n)
}

export function ProductImage({ large,  src} : { large?: boolean, src: string}) {
    const [loaded,setLoaded] = useState(false)
    return (
        <div className={(large ? "w-[192px]" : "w-32") + " " + (loaded ? "motion-preset-pop" : "invisible")
        }>
            <img src={src} onLoad={() => setLoaded(true)}></img>
        </div>                
    )
}

export type ProductPanelProps = { product?: Product }
export function ProductPanel(props: ProductPanelProps) {
    const navigate = useNavigate()
    const { product } = props
    if (!product) {
        return <div></div>
    }
    const handleClick = () => {
        //location.href = "/product/" + encodeURIComponent(product.id)
        navigate("/product/" + encodeURIComponent(product.id))
    }
    return (
        <div className="w-[400px] bg-white shadow-xl p-4 m-4 rounded-lg flex gap-8 
                    cursor-pointer border border-white hover:border hover:border-gray-400"
                onClick={handleClick}>
            <div className="flex flex-col gap-2"> { /* image + price */ }
                <ProductImage src={product.thumbnail}></ProductImage>
                <div className="grow"></div>
                <div className="font-bold">{formatMoney(product.price)}</div>
            </div>
            <div className="flex flex-col gap-2"> { /* title + description */}
                <div className="font-bold ">{product.title}</div>
                <div className="text-gray-600">{product.description}</div>
                <div className="grow"></div>
                <Rating rating={product.rating}></Rating>
            </div>
        </div>)
}

export type RatingProps = { rating: number }
export function Rating(props: RatingProps) {
    return (
        <div className="self-end flex">
            {[1,2,3,4,5].map((i) => (
                <div key={i} className={(i < props.rating ? "text-yellow-500" : "" 
                    ) + " text-2xl"}>★</div>
            ))}
        </div>
    )
}

export function useProduct_(id: number) {
    const [ product, setProduct] = useState<Product>()
    useEffect(() => {
        (async () => {
            const result = await fetch("https://dummyjson.com/product/" + id)
            const data = await result.json()
            setProduct(data)
        })()
    }, [])
    return product
}

export function useProduct(id: number) {
    const { data, refetch } = useQuery({
        queryKey: [ "product", id ],
        staleTime: 3_600 * 1_000,
        queryFn: async() => {
            const result = await fetch("https://dummyjson.com/product/" + id)
            const d = await result.json()
            return d as Product
        }
    })
    return {
        data: data,
        refetch
    }
}

export function useProducts(limit: number, skip?: number) {
    console.log("useProducts", limit, skip)
    const { data, refetch } = useQuery({
        queryKey: [ "products", limit, skip ],
        //placeholderData: (prev) => prev,
        staleTime: 600_000,
        queryFn: async() => {
            const params = new URLSearchParams()
            if (skip) params.set("skip", skip.toString())
            params.set("limit", limit.toString())
            const url = "https://dummyjson.com/products" + "?" + params.toString()
            console.log("url", url)
            const result = await fetch(url)
            const d = await result.json()
            return d as { products: Product[] }
        }
    })
    return { data: data, refetch }
}

export function useInterval(periodMs: number, n?: number) {
    const [trigger,setTrigger ] = useState(1)
    useEffect(() => {
        const id = setInterval(() => {
            setTrigger((prev) => {
                return !n || prev < n ? prev + 1 : prev
            })
        }, periodMs)
        return () => clearInterval(id)
    }, [ ])
    return trigger
} 

export function ProductsPage() {
    const CHUNKSIZE = 10
    const [limit, setLimit ] = useState(CHUNKSIZE)
    const [skip, setSkip] = useState(0)
    const [products,setProducts] = useState<Product[]>([])
    const { data } = useProducts(limit, skip)

    console.log("render:", skip, products.map(p => p.id))

    useEffect(() => {
        if (data?.products) {
            setProducts([...products, ...data?.products])
        }
    }, [data])

    const [animationParent] = useAutoAnimate()
    return (
        <div className="grow flex flex-col gap-4 overflow-y-auto py-2">
            <div className="flex flex-col gap-2">
            <button onClick={() => setSkip(products.length)} >Load more</button>
            </div>
            <div ref={animationParent} className="justify-center flex flex-wrap justify-items-center overflow-y-auto">
                {products.map((p) => <ProductPanel key={p.id} product={p} />)}
            </div>
        </div>
    )
}

export function AboutPage() {
    return (<div>About</div>)
}

export function MenuBar() {
    return (
        <div className="menubar flex gap-2
                h-16
                border-b border-gray-400 shadow
                items-center bg-white px-4 py-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/imprint">Imprint</NavLink>
            <div className="grow"></div>
            <div className="menuportal"></div>
        </div>)
}

export function MainGui() {
    return (
        <div className="grow flex flex-col">
            <MenuBar></MenuBar>
            <div className="h-1 grow flex flex-col">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

const router = createBrowserRouter([
    { path: "/", element: <MainGui></MainGui>, children: [
        { path: "/", element: <ProductsPage></ProductsPage> }, 
        { path: "/product/:id", element: <ProductDetailsView /> }, 
        { path: "/about", element: <AboutPage></AboutPage> }, 
        { path: "/imprint", element: <div>Imprint</div> }, 
        { path: "/*", element: <div>Alas, not found</div> }, 
    ] 
    },
])

export function App() {
    return (<RouterProvider router={router}></RouterProvider>)
}



