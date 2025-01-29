import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterMain } from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SignupFormContextProvider } from './SignupFormContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SignupFormContextProvider>
            <QueryClientProvider client={queryClient}>
                <RouterMain />
            </QueryClientProvider>
        </SignupFormContextProvider>
    </StrictMode>,
)
