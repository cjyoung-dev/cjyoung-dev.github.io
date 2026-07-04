import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const SECTIONS = [
  {
    title: 'Background',
    paragraphs: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    ],
  },
  {
    title: 'Outside of code',
    paragraphs: [
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
    ],
  },
  {
    title: 'What I\'m into',
    paragraphs: [
      'Doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.',
    ],
  },
] as const

function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-16">

      {/* Intro block */}
      <div className="flex items-center gap-5">
        {/* Placeholder photo */}
        <div
          className="w-16 h-16 rounded-full border flex items-center justify-center shrink-0"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
        >
          <span className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            CY
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
            About
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            A little more about who I am outside of a resume.
          </p>
        </div>
      </div>

      {/* Content sections */}
      <div className="flex flex-col gap-12">
        {SECTIONS.map(section => (
          <section key={section.title} className="flex flex-col gap-3">
            <h2
              className="text-base font-semibold pb-2 border-b"
              style={{ color: 'var(--text)', borderColor: 'var(--border)' }}
            >
              {section.title}
            </h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

    </div>
  )
}