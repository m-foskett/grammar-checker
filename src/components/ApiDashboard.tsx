import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'
import { formatDistance } from 'date-fns'
import LargeHeading from '@/ui/LargeHeading'
import Paragraph from '@/ui/Paragraph'
import { Input } from '@/ui/Input'
import Table from '@/components/Table'
import ApiKeyOptions from '@/components/ApiKeyOptions'

const ApiDashboard = async () => {
    // User data
    const user = await getServerSession(authOptions)
    // If user not found, throw 404
    if(!user) notFound()

    // Get API Keys of user, past and current valid
    const apiKeys = await db.apiKey.findMany({
      where: {userId: user.user.id },
    })
    // Get the current active API Key
    const activeApiKey = apiKeys.find((apiKey) => apiKey.enabled)
    // If no active API Key
    if(!activeApiKey) notFound()
    // Find all requests made by user with all API Keys
    const userRequests = await db.apiRequest.findMany({
      where: {
        apiKeyId: {
          in: apiKeys.map((key) => key.id)
        }
      }
    })
    // Serialise requests and dates
    const serialisableRequests = userRequests.map((req) => ({
      ...req,
      timestamp: formatDistance(new Date(req.timestamp), new Date()),
    }))

    return (
      <div className='container flex flex-col gap-6'>
        <LargeHeading>Welcome back, {user.user.name}</LargeHeading>
        <div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center'>
          <Paragraph>Your API Key:</Paragraph>
          <Input className='w-fit truncate' readOnly value={activeApiKey.key} />
          <ApiKeyOptions apiKeyId={activeApiKey.id} apiKeyKey={activeApiKey.key}/>
        </div>

        <Paragraph className='text-center md:text-left mt-4 mb-4'>
          Your API History
        </Paragraph>
        <Table userRequests={serialisableRequests} />
      </div>
    )
}

export default ApiDashboard