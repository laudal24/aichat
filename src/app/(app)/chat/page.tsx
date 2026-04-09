'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Code2, Eye, Zap, Trash2, Plus, Terminal } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'chat' | 'dev'>('chat')
  const [rightPanel, setRightPanel] = useState<'code' | 'preview'>('code')
  const [codeContent, setCodeContent] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, mode }),
      })

      if (!res.ok) throw new Error('API error')
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break
            try {
              const parsed = JSON.parse(data)
              const delta = parsed.choices?.[0]?.delta?.content ?? ''
              assistantText += delta
              setMessages((prev) => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: 'assistant', content: assistantText }
                return updated
              })
            } catch {}
          }
        }
      }

      // Extract code blocks for the code panel
      const codeMatch = assistantText.match(/```[\w]*\n([\s\S]*?)```/)
      if (codeMatch) setCodeContent(codeMatch[1])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please check your API key and try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-[#0B1020]">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-white">AI Chat</h1>
          <div className="flex items-center gap-1 ml-4 bg-[#050816] rounded-lg p-1">
            <button
              onClick={() => setMode('chat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                mode === 'chat' ? 'bg-[#6366F1] text-white' : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Terminal size={12} /> Chat
            </button>
            <button
              onClick={() => setMode('dev')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                mode === 'dev' ? 'bg-[#6366F1] text-white' : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Code2 size={12} /> Dev
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setMessages([]); setCodeContent('') }}
            className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Trash2 size={13} /> Clear
          </button>
          <button className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
            <Plus size={13} /> New
          </button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat panel */}
        <div className={`flex flex-col ${mode === 'dev' ? 'w-1/2 border-r border-white/5' : 'w-full'}`}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#6366F1]/20 flex items-center justify-center mb-4">
                  <Zap size={28} className="text-[#6366F1]" />
                </div>
                <p className="text-white font-semibold text-lg mb-2">Your AI developer is ready</p>
                <p className="text-[#9CA3AF] text-sm max-w-sm">
                  Describe what you want to build. Switch to{' '}
                  <strong className="text-white">Dev Mode</strong> for full code generation with file
                  trees and previews.
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#6366F1] text-white rounded-br-sm'
                      : 'bg-[#0B1020] text-[#F9FAFB] border border-white/5 rounded-bl-sm'
                  }`}
                >
                  {msg.content || (loading && i === messages.length - 1 ? (
                    <div className="typing-indicator">
                      <span /><span /><span />
                    </div>
                  ) : '')}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex justify-start">
                <div className="bg-[#0B1020] border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="typing-indicator"><span /><span /><span /></div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-end gap-3 bg-[#0B1020] border border-white/10 rounded-xl p-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Ask anything..."
                rows={1}
                className="flex-1 bg-transparent text-sm text-white placeholder-[#9CA3AF] resize-none outline-none max-h-32"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="p-2 bg-[#6366F1] rounded-lg text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-[#9CA3AF] mt-2 px-1">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>

        {/* Code/Preview panel (Dev mode only) */}
        {mode === 'dev' && (
          <div className="w-1/2 flex flex-col">
            <div className="flex items-center gap-1 px-4 py-2 border-b border-white/5 bg-[#0B1020]">
              <button
                onClick={() => setRightPanel('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  rightPanel === 'code' ? 'bg-white/10 text-white' : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                <Code2 size={12} /> Code
              </button>
              <button
                onClick={() => setRightPanel('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  rightPanel === 'preview' ? 'bg-white/10 text-white' : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                <Eye size={12} /> Preview
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {rightPanel === 'code' ? (
                <pre className="text-xs text-[#e6edf3] font-mono leading-relaxed whitespace-pre-wrap">
                  {codeContent || (
                    <span className="text-[#9CA3AF]">
                      Generated code will appear here. Ask the AI to build something in Dev Mode.
                    </span>
                  )}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-[#9CA3AF] text-sm">
                  Live preview coming soon
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
