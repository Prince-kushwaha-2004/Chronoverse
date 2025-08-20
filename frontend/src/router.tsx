import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import Loader from './components/loader'
export function createRouter() {
    const router = createTanStackRouter({
        routeTree,
        scrollRestoration: true,
        defaultPendingComponent: () => <div>Loading...from main</div>,
    })

    return router
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>
    }
}