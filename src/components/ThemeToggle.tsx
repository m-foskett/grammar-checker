'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/DropdownMenu'
import Button from '@/ui/Button'
import Icons from '@/components/Icons'

export function ThemeToggle() {
    // useTheme Hook to allow for Light/Dark/System Mode switch
    const {setTheme} = useTheme()
    return (
        <DropdownMenu>
            {/* Render as child to allow for button to be passed to it */}
            <DropdownMenuTrigger asChild>
                {/* Custom Button Component */}
                <Button variant='ghost' size='sm'>
                    {/* Lucide React Icons */}
                    <Icons.Sun className='rotate-0 scale-100 transition-all hover:text-slate-900 dark:-rotate-90 dark:scale-0 dark:text-slate-400 dark:hover:text-slate-100'/>
                    <Icons.Moon className='absolute rotate-90 scale-0 transition-all hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100'/>
                    {/* Accessibility: Screen Read Only */}
                    <span className='sr-only'>Toggle Theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' forceMount >
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Icons.Sun className='mr-2 h-4 w-4' />
                    <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Icons.Moon className='mr-2 h-4 w-4' />
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Icons.Laptop className='mr-2 h-4 w-4' />
                    <span>System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ThemeToggle