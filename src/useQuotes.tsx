import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE, QuotesResponse } from "./App";
import { useEffect } from "react";

const queryFunc = async (page: number) => {
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

export function useQuotes(page: number) {
    const query = useQuery({
        staleTime: 3600_0000,
        queryKey: [ "quotes", page],
        queryFn: () => queryFunc(page)
    })
    const queryClient = useQueryClient()
    useEffect(() => {
        for (let i = 0; i < 6; i++) {
            queryClient.prefetchQuery({
                queryKey: [ "quotes", i],
                queryFn: () => queryFunc(page)
            })
        }
    }, [])
    return query
}