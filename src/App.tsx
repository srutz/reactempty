import { ReactNode } from "react"
import { createBrowserRouter, Outlet, RouterProvider, useLoaderData, useLocation, useNavigate, useSearchParams } from "react-router-dom";


type QuoteType = { id: number; quote: string; author: string }
type QuotesResponse = { quotes: QuoteType[]; total: number; skip: number; limit: number }

const PAGE_SIZE = 250

export function QuotePanel({ quote }: { quote: QuoteType }) {
    return (
        <div className="shadow-lg flex flex-col gap-2 p-4 m-4 border border-gray-200 rounded w-96">
            <div>{quote.quote}</div>
            <div className="grow"></div>
            <div className="text-sm text-gray-500"> - {quote.author}</div>
        </div>
    )
}

const loadQuotes = async () => {
    const p = new URLSearchParams(window.location.search)
    let url = "https://dummyjson.com/quotes"
    p.set("limit", (PAGE_SIZE).toString())
    if (p.size > 0) {
        url += "?" + p.toString()
    }
    const response = await fetch(url)
    const json = await response.json()
    return json as QuotesResponse
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            { path: "/", element: <Page1 />, },
            { path: "/dashboard", element: <Page1 />, },
            { path: "/quotes", element: <Page2 />, loader: loadQuotes },
            { path: "/products", element: <Page3 />, },
        ]
    },
])

export function Page1() {
    return (<ContentPanel title="Dashboard" >
        <div className="flex-1 bg-indigo-200 flex flex-col items-center justify-center">
            <Banner>The Dashboard</Banner>
        </div></ContentPanel>
    )
}

export function Page2() {
    const navigate = useNavigate()
    const response = useLoaderData() as QuotesResponse
    const prev = () => { moveBy(-response.limit) }
    const next = () => { moveBy(response.limit) }
    const moveBy = (offset: number) => {
        const searchParams = new URLSearchParams(location.search);
        const oldOffset = Number.parseInt(searchParams.get("skip") || "0") || 0
        if (offset) {
            debugger
            searchParams.set("skip", (oldOffset + offset).toString())
        } else {
            searchParams.delete("skip")
        }
        const newUrl = `${location.pathname}?${searchParams.toString()}`
        navigate(newUrl)
        console.log(newUrl)
    }
    return (
        <ContentPanel title="Quotes" >
            <div className="flex-1 flex flex-col items-center">
                <div className="h-1 grow grid grid-cols-2 overflow-y-auto self-stretch">
                    {response.quotes.map((q) => <div className="flex justify-center"><QuotePanel key={q.id} quote={q}></QuotePanel></div>)}
                </div>
                <Pagination total={response.total} skip={response.skip} limit={response.limit} next={next} prev={prev}></Pagination>
            </div>
        </ContentPanel>)
}

export function Page3() {
    return (<ContentPanel title="Products" ><div className="flex-1 bg-indigo-200"></div></ContentPanel>)
}


export function Banner({ children }: { children: ReactNode }) {
    return (<div className="text-[length:80px] font-bold">{children}</div>)
}

export function Button({ children, clicked }: { children: ReactNode, clicked: () => void }) {
    return (
        <button className="px-3 py-1 bg-gray-200 text-gray-500 min-w-24 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            onClick={clicked}>
            {children}
        </button>
    )
}

export function Pagination({ total, skip, limit, next, prev }: { total: number; skip: number; limit: number, next: () => void; prev: () => void }) {
    const pageCount = Math.ceil(total / PAGE_SIZE)
    const page = 1 + Math.floor(skip / PAGE_SIZE)
    console.table({total, limit, skip, pageCount, page})
    return (
        <div className="flex justify-center items-center space-x-1 mt-4 gap-4">
            <Button clicked={prev}>Previous</Button>
            <span>{page} of {pageCount}</span>
            <Button clicked={next}>Next</Button>
        </div>
    )
}

export function Titlebar({ children }: { children: ReactNode }) {
    return (
        <div className="flex w-2/3 items-center rounded-md bg-gray-600 text-gray-100 text-sm px-3 py-1">
            {children}
        </div>
    )
}

export function SidebarMenu({ title, items }: { title: string, items: MenuItemType[] }) {
    return (
        <div className="border-r border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center text-green-700">
                <div className="font-extrabold text-base">{title}</div>
            </div>
            <div className="h-7"></div>
            <div className="font-bold text-gray-800 min-w-40">
                {items.map((item, index) => <SidebarMenuItem key={index} {...item} />)}
            </div>
        </div>
    )
}

export type MenuItemType = { label: string, pathname: string, }

export function SidebarMenuItem({ label, pathname }: MenuItemType) {
    const navigate = useNavigate()
    const location = useLocation()
    const active = location.pathname == pathname
    return (
        <div onClick={() => navigate(pathname)} className={`cursor-pointer select-none hover:underline my-1 px-2 py-1 pr-1 text-[length:14px] ${active ? "rounded bg-gray-200 rounded-md" : ""}`}>
            {label}
        </div>
    )
}

export function ContentPanel({ title, children }: { title: string, children: ReactNode }) {
    return (
        <div className="p-10 grow flex flex-col">
            <div className="font-extrabold text-black text-3xl mb-2">{title}</div>
            {children}
        </div>
    )
}


export function Main() {
    const { pathname } = useLocation()
    const menuItems: MenuItemType[] = [
        { label: "Dashboard", pathname: "/dashboard" },
        { label: "Quotes", pathname: "/quotes" },
        { label: "Products", pathname: "/products" },
    ]
    return (
        <div className="bg-black shrink grow h-1 flex flex-col gap-4 p-4 pt-8">
            <div className="grow overflow-hidden mx-2 rounded bg-gray-700 shadow-md flex flex-col">
                <div className="flex items-center justify-center px-2 pt-2">
                    <Titlebar>{pathname}</Titlebar>
                </div>
                <div className="flex grow overflow-hidden bg-white text-gray-600 rounded-lg mx-4 mb-4 mt-2">
                    <SidebarMenu title="😎 Router Stuff" items={menuItems} />
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export function App() {
    return <RouterProvider router={router} />
}

