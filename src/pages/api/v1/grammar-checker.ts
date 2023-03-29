import { withMethods } from "@/lib/api-middlewares/with-methods"
import { db } from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next"
import {z} from 'zod'

// Define a schema for the accepted request
const reqSchema = z.object({
    text: z.string().max(1000),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const body = req.body as unknown
    // Get the Authorisation Header
    const apiKey = req.headers.authorization as string
    // If there is no API Key, throw 401: Unauthorised
    if(!apiKey) {
        console.log('API Key not found in header')
        return res.status(401).json({error: 'Unauthorised'})
    }

    try {
        // Validate body of POST request against defined schema
        const { text } = reqSchema.parse(body)
        // Check if the API Key is currently valid
        const validApiKey = await db.apiKey.findFirst({
            where: {
                key: apiKey,
                enabled: true,
            }
        })
        // If no valid API Key found
        if(!validApiKey) {
            console.log('validApiKey not found in db', apiKey)
            return res.status(401).json({error: 'Unauthorised'})
        }
        console.log('Valid API Key found')
        // Initialise request ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Get start time
        const start = new Date()
        // API Endpoint
        const url = 'https://api.sapling.ai/api/v1/edits'
        // // Construct request data object
        const data = {
            key: process.env.SAPLING_API_KEY,
            text: text,
            session_id: 'Test UUID',
            lang: 'es',
            auto_apply: true, // True: result has extra field 'applied_text' with edits applied
        }
        // Make multiple requests simultaneously with Promise.all()
        // const edits = await Promise.all(
            // add typings for the handler and resp, see index.d.ts and create-api-key.ts
            const editsRes = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const editsRes_json = await editsRes.json();
            const edits = editsRes_json['edits']
            const appliedText = editsRes_json['applied_text']
            // console.log(edits);
        // )
        // Returns how long requests took in milliseconds [ms]
        const duration = new Date().getTime() - start.getTime()
        // // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        await db.apiRequest.create({
            data: {
                duration,
                method: req.method as string,
                path: req.url as string,
                status: 200,
                apiKeyId: validApiKey.id,
                usedApiKey: validApiKey.key,
            },
        })
        // Return success, original text and edits
        return res.status(200).json({success: true, appliedText: appliedText})
    } catch (error) {
        // If not parsed correctly
        if(error instanceof z.ZodError){
            console.log('Zod Error')
            return res.status(400).json({error: error.issues})
        }
        // Otherwise return generic error
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default withMethods(['POST'], handler)