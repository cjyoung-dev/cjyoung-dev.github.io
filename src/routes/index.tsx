import { createFileRoute } from '@tanstack/react-router'
import { useState} from 'react';
import {api} from '../lib/api.ts';

const ENDPOINTS = [
  {method: 'GET', path: '/api/profile', label: 'profile'},
  {method: 'GET', path: '/api/projects', label: 'projects'},
  {method: 'GET', path: '/api/skills', label: 'skills'},
  {method: 'GET', path: '/api/experience', label: 'experience'},
] as const;

type EndpointPath = typeof ENDPOINTS[number]['path']

type RequestState =
  | { status: 'idle' }
  | { status: 'loading'; startedAt: number }
  | { status: 'success'; data: unknown; duration: number; size: number }
  | { status: 'error'; message: string; duration: number }

const fetchMap: Record<EndpointPath, () => Promise<unknown>> = {
  '/api/profile':    api.profile,
  '/api/projects':   api.projects,
  '/api/skills':     api.skills,
  '/api/experience': api.experience,
}

export const Route = createFileRoute('/')({
  component: ApiClient,
})

function ApiClient() {
  const [active, setActive] = useState<EndpointPath>('/api/profile')
  const [reqState, setReqState] = useState<RequestState>({status: 'idle'})
  const [view, setView] = useState<'pretty' | 'raw'>('pretty')

  const activeEndpoint = ENDPOINTS.find(e => e.path === active)!

  async function handleSend() {
    setReqState({status: 'loading', startedAt: Date.now()})
    setView('pretty')
    try {
      const start = Date.now()
      const data = await fetchMap[active]()
      const duration = Date.now() - start
      const json = JSON.stringify(data)
      setReqState({
        status: 'success',
        data,
        duration,
        size: new Blob([json]).size,
      })
    } catch (err) {
      setReqState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Unknown error',
        duration: Date.now() - (reqState.status === 'loading' ? reqState.startedAt : Date.now())
      })
    }
  }

  const responseJson = reqState.status === 'success'
    ? JSON.stringify(reqState.data, null, view === 'pretty' ? 2 : 0)
    : null

  return (
    <div className="flex w-full h-full">

      {/* Sidebar */}
      <aside className="w-56 border-r border-border bg-surface flex flex-col shrink-0">
        <div className="px-3 py-2 border-b border-border">
          <span className="text-xs font-mono text-text/40 uppercase tracking-wider">Endpoints</span>
        </div>
        <nav className="flex flex-col py-1">
          {ENDPOINTS.map(ep => (
            <button
              key={ep.path}
              onClick={() => {
                setActive(ep.path)
                setReqState({ status: 'idle' })
              }}
              className={`flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors
                ${active === ep.path
                ? 'bg-accent/10 text-accent'
                : 'text-text/70 hover:bg-border/40 hover:text-text'
              }`}
            >
              <span className="font-mono text-xs text-accent/70">GET</span>
              <span className="font-mono">{ep.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main panel */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Request bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
          <span className="font-mono text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">
            GET
          </span>
          <span className="font-mono text-sm text-text/80 flex-1">{active}</span>
          <button
            onClick={handleSend}
            disabled={reqState.status === 'loading'}
            className="font-mono text-sm px-4 py-1.5 rounded bg-accent text-background font-medium
              hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {reqState.status === 'loading' ? 'Sending…' : 'Send'}
          </button>
        </div>

        {/* Response area */}
        <div className="flex flex-col flex-1 min-h-0">

          {/* Response meta bar */}
          {(reqState.status === 'success' || reqState.status === 'error') && (
            <div className="flex items-center gap-4 px-4 py-2 border-b border-border text-xs font-mono">
              {reqState.status === 'success' ? (
                <>
                  <span className="text-accent">200 OK</span>
                  <span className="text-text/40">{reqState.duration}ms</span>
                  <span className="text-text/40">{(reqState.size / 1024).toFixed(1)} KB</span>
                  <div className="ml-auto flex items-center gap-1 bg-surface rounded overflow-hidden border border-border">
                    {(['pretty', 'raw'] as const).map(v => (
                      <button
                        key={v}
                        onClick={() => setView(v)}
                        className={`px-3 py-1 text-xs capitalize transition-colors
                          ${view === v ? 'bg-border text-text' : 'text-text/40 hover:text-text'}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <span className="text-red-400">{reqState.message}</span>
              )}
            </div>
          )}

          {/* Response body */}
          <div className="flex-1 overflow-auto p-4">
            {reqState.status === 'idle' && (
              <div className="h-full flex items-center justify-center">
                <p className="font-mono text-sm text-text/25">
                  Select an endpoint and press Send
                </p>
              </div>
            )}
            {reqState.status === 'loading' && (
              <div className="h-full flex items-center justify-center">
                <p className="font-mono text-sm text-accent/60 animate-pulse">
                  Waiting for response…
                </p>
              </div>
            )}
            {reqState.status === 'error' && (
              <p className="font-mono text-sm text-red-400">Error: {reqState.message}</p>
            )}
            {reqState.status === 'success' && responseJson && (
              <pre className="font-mono text-sm text-text/80 whitespace-pre-wrap break-all leading-relaxed">
                {responseJson}
              </pre>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}