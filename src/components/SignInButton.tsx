"use client"

import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import Button from './ui/Button'

interface SignInButtonProps {}

const SignInButton = (props: SignInButtonProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const signInWithGoogle = async () => {
        try {
            setIsLoading(true)
            await signIn('google')
        } catch (error) {
            // toast({
            //     title: 'Error signing in',
            //     message: 'Please try again later',
            //     type: 'error',
            // })
        }
    }

    return (
        <Button onClick={signInWithGoogle} isLoading={isLoading}>
            Sign In
        </Button>
    )
}

export default SignInButton