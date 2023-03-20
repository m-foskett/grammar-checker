"use client"

import { signOut } from 'next-auth/react'
import React, { useState } from 'react'
import Button from './ui/Button'
import { toast } from './ui/Toast'

interface SignOutButtonProps {}

const SignOutButton = (props: SignOutButtonProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const signUserOut = async () => {
        try {
            setIsLoading(true)
            await signOut()
        } catch (error) {
            toast({
                title: 'Error signing out',
                message: 'Please try again later',
                type: 'error',
            })
        }
    }

    return (
        <Button onClick={signUserOut} isLoading={isLoading}>
            Sign Out
        </Button>
    )
}

export default SignOutButton