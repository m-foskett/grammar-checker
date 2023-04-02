'use client'

import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/DropdownMenu'
import Button from './ui/Button'
import { toast } from '@/ui/Toast'

const languages = [
    {
        symbol: 'de',
        language: 'German'
    },
    {
        symbol: 'el',
        language: 'Greek',
    },
    {
        symbol: 'en',
        language: 'English',
    },
    {
        symbol: 'es',
        language: 'Spanish',
    },
    {
        symbol: 'fr',
        language: 'French',
    },
    {
        symbol: 'it',
        language: 'Italian',
    },
    {
        symbol: 'jp',
        language: 'Japanese',
    },
    {
        symbol: 'ko',
        language: 'Korean',
    },
    {
        symbol: 'nl',
        language: 'Dutch',
    },
    {
        symbol: 'pl',
        language: 'Polish',
    },
    {
        symbol: 'pt',
        language: 'Portuguese',
    },
    {
        symbol: 'psv',
        language: 'Swedish',
    },
    {
        symbol: 'tl',
        language: 'Tagalog',
    },
    {
        symbol: 'zh',
        language: 'Chinese',
    },
]

interface LanguageSelectDropdownProps {
    handleSelect: (language: string) => void;
}

const LanguageSelectDropdown = ({handleSelect}: LanguageSelectDropdownProps) => {
    // State Variables
    const [selectedLanguage, setSelectedLanguage] = useState<string>('Spanish');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    className='flex gap-2 items-center'
                >
                    <p>
                        {selectedLanguage}
                    </p>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {languages.map((language) => (
                    <DropdownMenuItem key={language.symbol} onClick={() => {
                        handleSelect(language.symbol)
                        setSelectedLanguage(language.language)
                        toast({
                            title: 'New Language Selected',
                            message: `${language.language} selected`,
                            type: 'success',
                        })
                    }}>
                        {language.language}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LanguageSelectDropdown