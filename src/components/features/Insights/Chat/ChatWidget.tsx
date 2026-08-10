import { RefreshCw, Send, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/shared/Button'
import { useChat } from '@/hooks/useChat'

interface ChatWidgetProps {
  simulationId: string
}

const SUGGESTED_PROMPTS = [
  'Como posso economizar mais rápido?',
  'Vale a pena antecipar minhas dívidas?',
  'Onde devo investir esse valor?',
]

function TypingIndicator() {
  return (
    <div className="bg-secondary-button flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm px-4 py-3">
      <span className="bg-muted-foreground size-1.5 animate-bounce rounded-full [animation-delay:-0.3s]" />
      <span className="bg-muted-foreground size-1.5 animate-bounce rounded-full [animation-delay:-0.15s]" />
      <span className="bg-muted-foreground size-1.5 animate-bounce rounded-full" />
    </div>
  )
}

export function ChatWidget({ simulationId }: ChatWidgetProps) {
  const { messages, isLoading, error, sendMessage, retryLastMessage } =
    useChat(simulationId)
  const [draft, setDraft] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.trim() || isLoading) return

    sendMessage(draft)
    setDraft('')
  }

  return (
    <div className="border-border mt-6 border-t pt-5">
      <div className="mb-3 flex items-center gap-1.5">
        <Sparkles size={14} className="text-primary" />
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Converse sobre seu plano
        </span>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-thin mb-3 flex max-h-80 flex-col gap-3 overflow-y-auto pr-1 [scrollbar-color:var(--border)_transparent]"
      >
        {messages.length === 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tire dúvidas sobre o diagnóstico ou peça dicas específicas para a
              sua meta.
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="bg-secondary-button border-border text-foreground rounded-full border px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === 'user'
                ? 'flex justify-end'
                : 'flex justify-start'
            }
          >
            <p
              className={
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground max-w-[85%] rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed'
                  : 'bg-secondary-button text-foreground max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-3 text-sm leading-relaxed'
              }
            >
              {message.text}
            </p>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}

        {!isLoading && error && (
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm text-red-500">⚠️ {error}</p>
            <Button
              variant="secondary"
              className="px-4 py-2 text-xs"
              icon={RefreshCw}
              onClick={retryLastMessage}
            >
              Tentar novamente
            </Button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Pergunte algo sobre seu plano financeiro..."
          disabled={isLoading}
          className="bg-input text-foreground placeholder:text-muted-foreground flex-1 rounded-2xl px-4 py-3 text-sm outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || !draft.trim()}
          aria-label="Enviar mensagem"
          className="bg-primary text-primary-foreground flex size-11 shrink-0 items-center justify-center rounded-2xl transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
