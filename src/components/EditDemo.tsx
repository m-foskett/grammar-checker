'use client'

import React, { ChangeEvent, useState } from 'react'
import { Input } from '@/ui/Input'
import Button from '@/ui/Button'
import { editText } from '@/helpers/edit-text'
import Paragraph from '@/ui/Paragraph'
import useSWR from "swr"
import { ApiKey } from '@prisma/client'
import LanguageSelectDropdown from '@/components/LanguageSelectDropdown'

interface EditDemoProps {
    activeApiKey: ApiKey,
}

export default function EditDemo({activeApiKey}: EditDemoProps) {
    // State Variables
    const [text, setText] = useState<string>('');
    const [language, setLanguage] = useState<string>('es');
    const [editedText, setEditedText] = useState<string>('');
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);
    // useSWR implementation to make call to route handler
    // To Fix: stop calls on setText change
    const {data, error, isLoading, mutate: submitText, isValidating } = useSWR(
        shouldFetch ? ['/api/v1/grammar-checker', text, language, activeApiKey] : null,
        ([url, text, language, activeApiKey]) => editText(url, text, language, activeApiKey),
        {
            revalidateOnFocus: false,
            onSuccess: () => {
                setEditedText(data.appliedText)
                setShouldFetch(false);
            }
        }
    )

    // Loading State
    const loading = isLoading;
    const validating = isValidating;
    // Input Text Change Handler
    const textHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // Get the input value from the event
        setText(event.target.value)
    };
    // Language Select Handler Function
    const handleSelect = (selectedLanguage: string) => {
        setLanguage(selectedLanguage)
        console.log(selectedLanguage)
    }

    return (
        <div className='flex flex-col gap-y-3'>
            {/* Text Input Header*/}
            <div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center'>
                {/* Demo Heading */}
                <Paragraph className='text-center md:text-left mt-4 mb-4'>
                    Demo the Grammar Checking API
                </Paragraph>
                {/* Language Select Dropdown */}
                <LanguageSelectDropdown handleSelect={handleSelect}/>
            </div>
            {/* Corrections */}
            {/* Text Input */}
            <Input
                placeholder={(loading && 'Editing...') || 'Type some text here'}
                // placeholder={'Type some text here'}
                type='text'
                id='inputText'
                name='inputText'
                onChange={textHandler}
            />
            {/* Applied Text Output */}
            <Input readOnly placeholder={editedText != '' ? editedText : shouldFetch ? 'Correcting...' : 'Corrected result will appear here'} value={''}/>
            {/* <Input readOnly placeholder={'Corrected result will appear here'} value={''}/> */}
            {/* Submit Button */}
            <div className='mt-3 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0'>
                <Button
                    isLoading={loading}
                    // onClick={submitText}
                    onClick={()=>{
                        setEditedText('');
                        setShouldFetch(true);
                    }}
                >
                    Edit Text
                </Button>
            </div>
        </div>
    )
}