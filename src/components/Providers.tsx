'use client'

import React, { ReactNode } from 'react'
// Allows for light and dark mode
import { ThemeProvider } from "next-themes"
// Allows for client side authentication
import { SessionProvider } from 'next-auth/react'

const Providers = ({children}: {children: ReactNode}) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem >
        <SessionProvider>
            {children}
        </SessionProvider>
    </ThemeProvider>
  )
}

export default Providers