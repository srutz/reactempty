import { useDispatch } from "react-redux"
import { ProductsResponse } from "./ProductTypes"
import { changeProduct } from "./ShoppingCart"
import { useLoaderData } from "react-router-dom"
import { ProductPanel } from "./ProductPanel"


const PAGE_SIZE = 25

export async function loadProducts(props: any) {
    const search = props.request.url as string
    const p = new URL(search).searchParams
    let url = "https://dummyjson.com/products"
    p.set("limit", (PAGE_SIZE).toString())
    let page = 0
    const pageRaw = p.get("page")
    if (pageRaw) {
        page = Number.parseInt(pageRaw) - 1
        url += "?skip=" + (page * PAGE_SIZE)
    }
    const response = await fetch(url)
    const json = await response.json()
    return json as ProductsResponse
}


export function ProductsPage() {
    const response = useLoaderData() as ProductsResponse
    const products = response.products


    return (
        <div className="py-8 w-full flex flex-col gap-2 overflow-y-auto items-center">
            {products.map((product) => (
                <ProductPanel key={product.id} product={product} />
            ))}
        </div>
    )
}