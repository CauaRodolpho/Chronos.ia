import { useCallback, useState } from 'react'

import { buildChatSystemPrompt } from '@/data/aiPrompt'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { type ChatMessage, sendChatMessage } from '@/services/aiService'

export const useChat = (simulationId: string) => {
  const { getFormData } = useSimulationStorage()

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestReply = useCallback(
    async (history: ChatMessage[]) => {
      const simulation = getFormData(simulationId)

      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const systemPrompt = buildChatSystemPrompt(simulation)
        const reply = await sendChatMessage(history, systemPrompt)

        setMessages([...history, { role: 'model', text: reply }])
      } catch {
        setError('Não foi possível enviar sua mensagem. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    },
    [getFormData, simulationId],
  )

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim()

      if (!trimmed || isLoading) {
        return
      }

      const nextMessages: ChatMessage[] = [
        ...messages,
        { role: 'user', text: trimmed },
      ]

      setMessages(nextMessages)
      requestReply(nextMessages)
    },
    [isLoading, messages, requestReply],
  )

  const retryLastMessage = useCallback(() => {
    if (messages.length === 0 || isLoading) {
      return
    }

    requestReply(messages)
  }, [isLoading, messages, requestReply])

  return { messages, isLoading, error, sendMessage, retryLastMessage }
}
