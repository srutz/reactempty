import { useQuery } from "@tanstack/react-query";
import { PAGE_SIZE, QuotesResponse } from "./App";

export const queryFunc = async (page: number) => {
    let url = "https://dummyjson.com/quotes"
    const p = new URLSearchParams()
    p.set("limit", (PAGE_SIZE).toString())
    if (page > 0) {
        p.set("skip", (page * PAGE_SIZE).toString())
    }
    const response = await fetch(url + "?" + p.toString())
    const json = await response.json()
    return json as QuotesResponse
}

export async function delay(delayMs: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, delayMs)
    })
}

export function useQuotes(page: number) {
    const query = useQuery({
        staleTime: 3600_0000,
        queryKey: [ "quotes", page],
        queryFn: () => queryFunc(page)
    })
    return query
}