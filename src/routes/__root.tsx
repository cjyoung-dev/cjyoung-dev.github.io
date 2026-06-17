import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <RootLayout />
      <TanStackRouterDevtools />
    </>
  ),
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-text font-sans flex flex-col">
      <header className="border-b border-border px-4 py-3 flex items-center gap-3 bg-surface">
        <span className="font-mono text-accent font-medium text-sm">cjyoung.dev</span>
        <span className="text-border text-sm select-none">/</span>
        <span className="font-mono text-text/50 text-sm">portfolio-api</span>
      </header>
      <main className="flex-1 flex">
        <Outlet />
      </main>
    </div>
  )
}