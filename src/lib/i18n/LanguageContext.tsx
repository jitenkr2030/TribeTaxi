"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'
import enTranslations from './en'
import hiTranslations from './hi'
import sanTranslations from './san'
import munTranslations from './mun'
import hoTranslations from './ho'

interface LanguageContextType {
  language: 'en' | 'hi' | 'san' | 'mun' | 'ho'
  setLanguage: (lang: 'en' | 'hi' | 'san' | 'mun' | 'ho') => void
  t: (key: string) => string
  translations: any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<'en' | 'hi' | 'san' | 'mun' | 'ho'>('en')

  const translations = {
    en: enTranslations,
    hi: hiTranslations,
    san: sanTranslations,
    mun: munTranslations,
    ho: hoTranslations
  }[language]

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return the key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  const value = {
    language,
    setLanguage,
    t,
    translations
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'hi', label: 'हिं', name: 'हिन्दी' },
    { code: 'san', label: 'सं', name: 'संथाली' },
    { code: 'mun', label: 'मुं', name: 'मुण्डारी' },
    { code: 'ho', label: 'हो', name: 'हो' }
  ]

  return (
    <div className="flex items-center space-x-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as any)}
          className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
            language === lang.code
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title={lang.name}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}