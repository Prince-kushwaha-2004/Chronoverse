/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import { Toaster } from "@/components/ui/sonner"
import "../setup"
import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
} from '@tanstack/react-router'

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()



import appCss from '../styles/index.css?url'

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'Chronoverse',
            },
        ],
        links: [{ rel: 'stylesheet', href: appCss }],
    }),
    component: RootComponent,
})

function RootComponent() {
    return (
        <QueryClientProvider client={queryClient}>
            <RootDocument>
                <Outlet />
            </RootDocument>
        </QueryClientProvider>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html className='scroll-smooth dark'>
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
                <Toaster position="top-center" richColors />
            </body>
        </html>
    )
}