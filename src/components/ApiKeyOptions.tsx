'use client'

import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/DropdownMenu'
import Button from './ui/Button'
import { Loader2 } from 'lucide-react'
import { toast } from '@/ui/Toast'
import { createApiKey } from '@/helpers/create-api-key'
import { useRouter } from 'next/navigation'
import { revokeApiKey } from '@/helpers/revoke-api-key'

interface ApiKeyOptionsProps {
    apiKeyId: string,
    apiKeyKey: string,
}

const ApiKeyOptions = ({apiKeyId, apiKeyKey}: ApiKeyOptionsProps) => {
    // State Variables
    const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false)
    const [isRevoking, setIsRevoking] = useState<boolean>(false)
    // Navigation Router
    const router = useRouter()

    // Create New API Key
    const createNewApiKey = async () => {
        setIsCreatingNew(true)

        try {
            await revokeApiKey({keyId: apiKeyId})
            await createApiKey()
            router.refresh()
        } catch (error) {
            toast({
                title: 'Error creating new API Key',
                message: 'Please try again later.',
                type: 'error',
            })
        } finally {
            setIsCreatingNew(false)
        }
    }
    // Revoke Current API Key
    const revokeCurrentApiKey = async () => {
        setIsRevoking(true)
        try {
            await revokeApiKey({keyId: apiKeyId})
            router.refresh()
        } catch (error) {
            toast({
                title: 'Error revoking API Key',
                message: 'Please try again later.',
                type: 'error',
            })
        } finally {
            setIsRevoking(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
                <Button
                    variant='ghost'
                    className='flex gap-2 items-center'
                >
                    <p>
                        {isCreatingNew ? 'Creating a new API Key' : isRevoking ? 'Revoking key' : 'Options'}
                    </p>
                    {isCreatingNew || isRevoking ? (
                        <Loader2 className='animate-spin h-4 w-4' />
                    ) : (
                        null
                    )}
                </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => {
                    navigator.clipboard.writeText(apiKeyKey)
                    toast({
                        title: 'Copied',
                        message: 'API Key copied to clipboard',
                        type: 'success',
                    })
                }}>
                    Copy
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={createNewApiKey}
                >
                    Create a new key
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={revokeCurrentApiKey}
                >
                    Revoke key
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ApiKeyOptions