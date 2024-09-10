import { ReactNode } from "react"
import { createBrowserRouter, Outlet, RouterProvider, useLocation, useNavigate } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            { path: "/", element: <Page1 />, },
            { path: "/dashboard", element: <Page1 />, },
            { path: "/products", element: <Page2 />, },
            { path: "/quotes", element: <Page3 />, },
        ]
    },
])


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
            <div className="font-bold text-gray-800">
                {items.map((item, index) => <SidebarMenuItem key={index} {...item} />)}
            </div>
        </div>
    )
}

export type MenuItemType = { label: string, active?: boolean, clicked: () => void }

export function SidebarMenuItem({ label, clicked, active }: MenuItemType) {
    return (
        <div onClick={clicked} className={`cursor-pointer select-none hover:underline my-1 px-2 py-1 pr-1 text-[length:14px] ${active ? "rounded bg-gray-100 rounded-md" : ""}`}>
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


export function Page1() {
    return (<ContentPanel title="Dashboard" ><div className="flex-1 bg-orange-200"></div></ContentPanel>)
}

export function Page2() {
    return (<ContentPanel title="Quotes" ><div className="flex-1 bg-pink-200"></div></ContentPanel>)
}

export function Page3() {
    return (<ContentPanel title="Products" ><div className="flex-1 bg-indigo-200"></div></ContentPanel>)
}

export function Main() {
    const navigate = useNavigate()

    const menuItems: MenuItemType[] = [
        { label: "Dashboard", clicked: () => navigate("/dashboard"), active: true },
        { label: "Quotes", clicked: () => navigate("/quotes") },
        { label: "Products", clicked: () => navigate("/products") },
    ]
    return (
        <div className="bg-black shrink grow h-1 flex flex-col gap-4 p-4 pt-8">
            <div className="grow overflow-hidden mx-2 rounded bg-gray-700 shadow-md flex flex-col">
                <div className="flex items-center justify-center px-2 pt-2">
                    <Titlebar>Router Sample</Titlebar>
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

