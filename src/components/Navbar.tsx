import React from 'react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { buttonVariants } from '@/ui/Button'
import SignInButton from '@/components/SignInButton'
import SignOutButton from '@/components/SignOutButton'

const Navbar = async () => {
    // Get user session
    const session = await getServerSession()
    return (
        <div className='fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between'>
            <div className='container max-w-7xl mx-auto w-full flex justify-between items-center'>
                {/* Home Link */}
                <Link
                    href='/'
                    className={buttonVariants({variant: 'link'})}
                >
                    Grammar Checker 1.0
                </Link>
                {/* Theme Toggle */}
                <div className='md:hidden'>
                    {/* <ThemeToggle /> */}
                </div>
                {/* Theme Toggle + Documentation Link */}
                <div className='hidden md:flex gap-4'>
                    {/* <ThemeToggle /> */}
                    <Link
                        href='/documentation'
                        className={buttonVariants({variant: 'ghost'})}
                    >
                        Documentation
                    </Link>

                    {/* Check if there is a current session */}
                    {session ? (
                        <>
                            <Link
                                className={buttonVariants({variant: 'ghost'})}
                                href='/dashboard'
                            >
                                Dashboard
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <SignInButton />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar