import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: () => (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
        // contact — coming soon
      </p>
    </div>
  ),
})