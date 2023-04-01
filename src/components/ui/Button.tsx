import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

// Class Variance Authority
// First Argument: Consistent Style
// Second Argument: Variants
export const buttonVariants = cva(
    'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-primary-400 disabled:pointer-events-none dark:focus:ring-offset-primary-900',
    {
        variants: {
            variant: {
                default: 'bg-primary-900 text-white hover:bg-primary-800 dark:bg-primary-200 dark:text-primary-900 dark:hover:bg-primary-100',
                outline: 'bg-primary-900 text-white hover:bg-primary-900 dark:bg-primary-200 dark:text-primary-900 dark:hover:bg-primary-100 border border-primary-900 hover:bg-primary-100 dark:border-primary-700',
                ghost: 'bg-transparent hover:bg-primary-100 dark:hover:bg-primary-800 dark:text-primary-400 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
                link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-primary-900 dark:text-primary-100 hover:bg-transparent dark:hover:bg-transparent',
            },
            size: {
                default: 'h-10 py-2 px-4',
                sm: 'h-9 px-2 rounded-md',
                lg: 'h-11 px-8 rounded-md',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
            // Optional Loading Condition
            isLoading?: boolean
        }

const Button = forwardRef<HTMLButtonElement, ButtonProps>((
    {
        className, size, children, variant, isLoading, ...props
    }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading}
                {...props}
            >
                {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export default Button