import { ComponentProps, ReactNode } from "react"
import { createBrowserRouter, Outlet, RouterProvider, useLoaderData, useLocation, useNavigate, useNavigation, useRouteError } from "react-router-dom";


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

const loadQuotes = async (props: any) => {
    const search = props.request.url as string
    const p = new URL(search).searchParams
    let url = "htxxtps://dummyjson.com/quotes"
    p.set("limit", (PAGE_SIZE).toString())
    let page = 0
    const pageRaw = p.get("page")
    if (pageRaw) {
        page = Number.parseInt(pageRaw) - 1
        url += "?skip=" + (page * PAGE_SIZE)
    }
    const response = await fetch(url)
    const json = await response.json()
    return json as QuotesResponse
}

const loadSingleQuote = async (props: any) => {
    const id = props.params.id
    let url = "https://dummyjson.com/quotes/" + id
    const response = await fetch(url)
    const json = await response.json()
    return json as QuoteType
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            { path: "/", element: <Page1 />, },
            { path: "/dashboard", element: <Page1 />, },
            {
                path: "/quotes", element: <Page2 />, loader: loadQuotes, children: [
                    { path: "/quotes/:id", element: <QuoteDetails />, loader: loadSingleQuote },
                ],
                errorElement: <Error></Error>
            },
            { path: "/products", element: <Page3 />, },
            { path: "*", element: <Error>We haven't found where you were looking for</Error> },
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
    const page = Math.floor(response.skip / PAGE_SIZE)
    const prev = () => { moveTo(page - 1) }
    const next = () => { moveTo(page + 1) }
    const moveTo = (page: number) => {
        const searchParams = new URLSearchParams(location.search);
        if (page >= 1) {
            searchParams.set("page", (page + 1).toString())
        } else {
            searchParams.delete("page")
        }
        const newUrl = `/quotes/?${searchParams.toString()}`
        navigate(newUrl)
    }
    return (
        <ContentPanel title="Quotes" >
            <div className="flex-1 flex flex-col items-stretch">
                <div className="h-1 grow grid grid-cols-2 overflow-y-auto self-stretch">
                    {response.quotes.map((q) => <div key={q.id} onClick={() => { navigate(`/quotes/${q.id}`) }}
                        className="flex justify-center cursor-pointer hover:text-black"><QuotePanel quote={q}></QuotePanel></div>)}
                </div>
                <Pagination total={response.total} skip={response.skip} limit={response.limit} next={next} prev={prev}></Pagination>
                <Outlet></Outlet>
            </div>
        </ContentPanel>)
}

export function Page3() {
    return (<ContentPanel title="Products" ><div className="flex-1 bg-indigo-200"></div></ContentPanel>)
}

export function QuoteDetails() {
    const quote = useLoaderData() as QuoteType
    const navigate = useNavigate()
    const closed = () => {
        let url = "/quotes"
        const page = (quote.id - 1) / PAGE_SIZE
        if (page) {
            url += "/?page=" + (page + 1)
        }
        navigate(url)
    }
    const content = (
        <div className="flex flex-col gap-4 pt-4 pb-4">
            <img src="https://picsum.photos/400/300" className="rounded-lg" />
            <div className="flex-1 text-2xl">{quote.quote}</div>
        </div>)
    return (
        <Modal show title={"Quote No " + quote.id} onClose={closed}>
            {content}
        </Modal>
    )
}

export function Error({ children } : { children?: ReactNode}) {
    const error = useRouteError() as any
    return (<div className="text-[length:14px] font-bold flex flex-col gap-2 m-8">
        <div className="flex items-center gap-4">
            <span className="text-red-200 text-xl">⚠</span> {children || "There was an error loading this resource"}
            </div>
        {error && ( 
            <div className="text-xs text-red">{error.toString()}</div>
        )}
        </div>
    )

}

export function Banner({ children }: { children: ReactNode }) {
    return (<div className="text-[length:80px] font-bold">{children}</div>)
}

export function Button({ children, clicked, ...props }: { children: ReactNode, clicked: () => void } & ComponentProps<"button">) {
    return (
        <button className="smallbutton"
            onClick={clicked} {...props}>
            {children}
        </button>
    )
}

export function Pagination({ total, skip, next, prev }: { total: number; skip: number; limit: number, next: () => void; prev: () => void }) {
    const pageCount = Math.ceil(total / PAGE_SIZE)
    const page = Math.floor(skip / PAGE_SIZE)
    const hasNext = page < pageCount - 1
    const hasPrev = page > 0
    return (
        <div className="flex justify-center items-center space-x-1 mt-4 gap-4">
            <Button clicked={prev} disabled={!hasPrev}>Previous</Button>
            <span>{page + 1} of {pageCount}</span>
            <Button clicked={next} disabled={!hasNext}>Next</Button>
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

export function Modal({ show, title, onClose, children }: {
    show: boolean
    title: string
    onClose: () => void
    children: React.ReactNode
}) {
    if (!show) {
        return null
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg" style={{ width: "calc(min(800px,60vw))" }}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-xl">
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
                <div className="flex justify-end p-4 border-t">
                    <button onClick={onClose} className="largebutton">
                        Close
                    </button>
                </div>
            </div>
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
        <div className="bg-black shrink grow h-1 flex flex-col gap-4 p-4 pt-8 items-center">
            <div className="grow overflow-hidden mx-2 rounded bg-gray-700 shadow-md flex flex-col w-full lg:w-[length:1024px]">
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

