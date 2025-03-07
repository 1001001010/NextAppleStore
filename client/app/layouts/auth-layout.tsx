"use client"

import { type ReactNode, useEffect } from "react"
import { Toaster } from "sonner"

interface AuthLayoutProps {
    children: ReactNode
    title?: string
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
    // Устанавливаем темную тему при монтировании компонента
    useEffect(() => {
        document.documentElement.classList.add("dark")
        return () => {
            // Опционально: удаляем класс при размонтировании, если нужно
            document.documentElement.classList.remove('dark')
        }
    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Toaster theme="dark" position="top-right" richColors />
            {children}
        </div>
    )
}

