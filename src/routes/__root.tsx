import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar} from '../components/Navbar.tsx';

export const Route = createRootRoute({
  component: () => (
    <>
      <RootLayout />
    </>
  ),
})

function RootLayout() {
  return (
    <div className='min-h-screen' style={{backgroundColor: 'var(--background)'}}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}