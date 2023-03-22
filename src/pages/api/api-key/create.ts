import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateApiData } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid"
import { z } from "zod"
import { withMethods } from "@/lib/api-middlewares/with-methods";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<CreateApiData>
) => {
    try {
        // Get the user if it exists
        const user = await getServerSession(req, res, authOptions).then((res) => res?.user)
        // If no user found
        if(!user) {
            return res.status(401).json({
                error: 'Unauthorised, can not perform this action.',
                createdApiKey: null,
            })
        }

        // If there is a user, check if they have an existing API Key
        const existingApiKey = await db.apiKey.findFirst({
            where: {userId: user.id, enabled: true}
        })
        // If there is an existing API key, return error
        if(existingApiKey){
            return res.status(400).json({
                error: 'You already have a valid API Key',
                createdApiKey: null,
            })
        }
        // If there is no existing API key, create one
        const createdApiKey = await db.apiKey.create({
            data: {
                userId: user.id,
                key: nanoid(),
            },
        })
        return res.status(200).json({error: null, createdApiKey })
    } catch (error) {
        // Schema Error
        if(error instanceof z.ZodError) {
            return res.status(400).json({error: error.issues, createdApiKey: null })
        }
        // Unknown Error
        return res.status(500).json({
            error: 'Internal Server Error',
            createdApiKey: null,
        })
    }
}

export default withMethods(['GET'], handler)