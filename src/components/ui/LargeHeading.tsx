import React, { forwardRef, HTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Class Variance Authority
// First Argument: Consistent Style
// Second Argument: Variants
const headingVariants = cva(
    "text-black dark:text-white text-center lg:text-left font-extrabold leading-tight  tracking-tighter",
    {
        variants: {
            size: {
                default: 'text-4xl md:text-5xl lg:text-6xl',
                lg: 'text-5xl md:text-6xl lg:text-7xl',
                sm: 'text-2xl md:text-3xl lg:text-4xl',
            }
        },
        defaultVariants: {
            size: 'default',
        }
    }
)

interface LargeHeadingProps
    extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants>{}

// forwardRef('renderedComponentType', 'props')
// Passes a ref/link to a DOM node
export const LargeHeading = forwardRef<HTMLHeadingElement, LargeHeadingProps>((
    {
        className, size, children, ...props
    }, ref) => {
    return (
        <h1
            ref={ref}
            {...props}
            className={cn(headingVariants({ size, className }))}
        >
            {children}
        </h1>
    )
})

LargeHeading.displayName = 'Large Heading'

export default LargeHeading