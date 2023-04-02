import { ApiKey } from "@prisma/client"
import { notFound } from "next/navigation"

// Fetcher Function: wrapper function of native fetch
export async function editText(url: string, text: string, language: string, activeApiKey: ApiKey) {
    // If no active API Key
    if(!activeApiKey) notFound()
    // Local API Route - maybe change to use Next.js 13 Routes
    // const url = '/api/v1/grammar-checker'
    // Construct request data object
    const data = {
        text: text,
        language: language,
    }
    // POST Request
    const res = await fetch(url, {
        cache: 'no-store', // no cache
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: activeApiKey.key,
        },
        body: JSON.stringify(data)
    })
    // Return the result of the POST request
    return await (res.json())
}