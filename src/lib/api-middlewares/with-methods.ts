import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export function withMethods(methods: string[], handler:  NextApiHandler) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        // Check if the requested method is not included within the allowed methods
        if(!req.method || !methods.includes(req.method)) {
            // Invalid request: Method not allowed
            return res.status(405).end()
        }
        return handler(req, res)
    }
}