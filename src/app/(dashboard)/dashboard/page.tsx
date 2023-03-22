import React from 'react'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import ApiDashboard from '@/components/ApiDashboard'
import RequestApiKey from '@/components/RequestApiKey'

export const metadata: Metadata = {
    title: 'Grammar Checking API | Dashboard',
    description: 'Free & open-source text grammar checking API',
}

const page = async () => {
    // Get session
    const user = await getServerSession(authOptions)
    // If there is no user found, throw a 404
    if (!user) return notFound()

    // Find key where userId mathces user.user.id and the key is enabled
    const apiKey = await  db.apiKey.findFirst({
        where: { userId: user.user.id, enabled: true },
    })
    return (
        <div className='max-w-7xl mx-auto mt-16'>
            {/* If we have an ApiKey ? render the dashboard else render the API Request Component */}
            {apiKey ? <ApiDashboard/> : <RequestApiKey />}
        </div>
    )
}

export default page