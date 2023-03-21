import { LargeHeading } from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Grammar Checker API | Home',
  description: 'Free & open source grammar checking API'
}

export default function Home() {
    return (
        <div className='relative h-screen flex items-center justify-center overflow-x-hidden'>
          <div className='container pt-32 max-w-7xl mx-auto w-full h-full'>
            <div className='h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start'>
              {/* Home Page Heading */}
              <LargeHeading
                size='lg'
                className='three-d text-black dark:text-light-gold'
              >
                Easily check for grammar <br /> errors in your text.
              </LargeHeading>
              {/* Home Page Description */}
              <Paragraph className='max-w-xl lg:text-left'>
                With the grammar checker API, you can easily identify grammar errors within a piece of text with a free{' '}
                <Link href='/login' className='underline underline-offset-2 text-black dark:text-light-gold'>
                  API key
                </Link>
                .
              </Paragraph>
              {/* Home Page Image */}
              <div className='relative w-full max-w-lg lg:max-w-3xl lg:left-1/2 aspect-square lg-absolute'>
                <Image
                  priority
                  className='img-shadow'
                  quality={100}
                  style={{objectFit: 'contain'}}
                  fill
                  src='/typewriter.jpg'
                  alt='typewriter'
                />
              </div>
            </div>
          </div>
        </div>
    )
}
