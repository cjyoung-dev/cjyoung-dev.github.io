import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-foreground text-xl">Route is working</p>
    </div>
  )
}