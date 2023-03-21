import React from 'react'
import type { Metadata } from 'next'
import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import DocumentationTabs from '@/components/DocumentationTabs'

export const metadata: Metadata = {
    title: 'Grammar Checker API | Documentation',
    description: 'Free & Open-source grammmar checking API',
}

const page = () => {
  return (
    <div className='container max-w-7xl mx-auto mt-12'>
        <div className='flex flex-col items-center gap-6'>
            <LargeHeading>Make a request</LargeHeading>
            <Paragraph>api/v1/grammar-checker</Paragraph>

            <DocumentationTabs />
        </div>
    </div>
  )
}

export default page